# Synthetic feature request: credential visibility

A reviewer of a fictional charging session needs to identify the access method and, for RFID, the associated credential. Show its human-readable alias when present. Otherwise show a masked identifier with only the last four characters visible. Never render the full credential identifier. Clearly identify revoked credentials. Hide the credential field for mobile-app and automatic sessions.

The list provides session ID, station, start time, access method and session status. A session link opens details; a back link returns to the list. This request, its data and all subsequent decisions were invented for this portfolio.

Acceptance outcomes: safe identification, no rendered raw identifiers, clear revoked state, usable navigation, and graceful handling of incomplete data.
