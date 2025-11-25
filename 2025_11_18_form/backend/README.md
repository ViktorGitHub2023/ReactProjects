Setup and run the backend:

1. Open terminal in `velemenyek_app/backend`.
2. Install dependencies:

```powershell
npm install
```

3. Start the server:

```powershell
npm start
```

The server listens on port 4000 by default and exposes:
- `GET /api/velemenyek` - list all rows
- `POST /api/velemenyek` - create a row (JSON body)

JSON body example:

```json
{
  "nem": "férfi",
  "kedvencek": ["html","css"],
  "szint": ["junior"],
  "evek": 3
}
```
