Request
   │
   ▼
express.json()
   │
   ▼
verify(req, res, buf)
   │
   ├── JSON.parse(buf) throws SyntaxError
   │
   ▼
catch block
   │
   ▼
throw new Error("invalid_json")
   │
   ▼
express.json() catches the error internally
   │
   ▼
next(err)        ← effectively happens internally
   │
   ▼
Express skips all normal middleware/routes
   │
   ▼
Error middleware
app.use((err, req, res, next) => {
    ...
})
   │
   ▼
Send 400 response

app.use(express.json({
    strict: true,
    verify: (req, res, buf) => {
        try {
            JSON.parse(buf);
        } catch (e) {
            const err: any = new Error("bad_request");
            err.status = 400;
            throw err;
        }
    }
}));

app.use((err, req, res, next) => {
    if (err.message === "bad_request") {
        return res.status(400).send({
            success: false,
            message: req.t("bad_request")
        });
    }

    logger.error(err);

    return res.status(500).send({
        success: false,
        message: req.t("something_went_wrong")
    });
});
