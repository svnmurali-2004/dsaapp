const user = require("./models/userSchema");
const { app } = require("./server");

app.post("/api/getprofile".authmiddleware, async (req, res) => {
    try {
        const userdata = req.userdata;
        const user1 = await user.findOne({ email: userdata.email });
        res.send({ ok: true, msg: "user fetched", user: user1 });
    } catch (err) {
        console.log(err);
        res.status(500).send({ ok: false, msg: "server error" });
    }
});
