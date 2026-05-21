## LAB 3 — try/catch & Secure Logic

### Objective

Apply defensive error handling, exactly as shown in the class demo:

- JSON.parse

- try/catch

- fail safely

- authorization logic

---

### Directions

In this lab you will implement a function that processes user input in JSON format.

- Any error should result in access denied.

- Never trust user input.

##### Rules

- If JSON is invalid → "user"

- If role is missing → "user"

- If role is different from "admin" → "user"

- Only "admin" returns "admin"

##### Used concepts

- try/catch

- JSON vs JS object

- fail-safe

- security logic