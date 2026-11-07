"""Privacy-aware helpers for the shared RecallHQ Hindsight memory bank."""

from __future__ import annotations

import re
from collections.abc import Sequence

from hindsight_client import Hindsight

BANK_ID = "recallhq-universal"

_EMAIL_RE = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.IGNORECASE)
_PHONE_RE = re.compile(r"(?<!\w)\+?\d[\d().\-\s]{7,}\d(?!\w)")
_SSN_RE = re.compile(r"\b\d{3}-\d{2}-\d{4}\b")
_INTRODUCED_NAME_RE = re.compile(
    r"(?i:\b(?:my name is|i am|i'm|this is|name:))\s+"
    r"([A-Z][a-z]+(?:[ '-][A-Z][a-z]+){0,2})"
)
_ROLE_NAME_RE = re.compile(
    r"(?i:\b(organizer|engineer|attendee|customer|client|manager|"
    r"coordinator|assistant|speaker|vendor))\s+"
    r"([A-Z][a-z]+(?:[ '-][A-Z][a-z]+){0,2})"
)


def _replace_phone(match: re.Match[str]) -> str:
    digits = sum(character.isdigit() for character in match.group())
    return "[User]" if 10 <= digits <= 15 else match.group()


def scrub_pii(text: str) -> str:
    """Redact common direct identifiers and names explicitly presented as people."""
    scrubbed = _EMAIL_RE.sub("[User]", text)
    scrubbed = _SSN_RE.sub("[User]", scrubbed)
    scrubbed = _PHONE_RE.sub(_replace_phone, scrubbed)
    scrubbed = _ROLE_NAME_RE.sub(lambda match: f"[{match.group(1).title()}]", scrubbed)
    scrubbed = _INTRODUCED_NAME_RE.sub("[User]", scrubbed)
    return scrubbed


class HindsightService:
    """Async wrapper for retain/recall operations in the universal memory bank."""

    def __init__(self, client: Hindsight, bank_id: str = BANK_ID) -> None:
        self.client = client
        self.bank_id = bank_id

    async def ensure_bank(self):
        try:
            # Attempt to create/ensure the bank, but safely bypass if 403 Forbidden
            await self.client.acreate_bank(bank_id=self.bank_id)
        except Exception as e:
            # Ignore 403 / permission errors since the default bank is already active
            print(f"Skipping bank creation (using default/existing bank): {e}")

    async def retain(self, content: str, tags: Sequence[str] = ()) -> None:
        safe_content = scrub_pii(content)
        safe_tags = [scrub_pii(tag) for tag in tags if tag.strip()]
        await self.client.aretain(
            bank_id=self.bank_id,
            content=safe_content,
            tags=safe_tags or None,
        )

    async def recall(self, query: str) -> list[str]:
        result = await self.client.arecall(
            bank_id=self.bank_id,
            query=scrub_pii(query),
            max_tokens=2048,
        )
        return [
            scrub_pii(memory.text)
            for memory in result.results
            if getattr(memory, "text", None)
        ]

    async def close(self) -> None:
        await self.client.aclose()
