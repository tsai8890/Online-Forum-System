import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useUser } from "./hooks/useUser";

const SysMessage = () => {
    const {status} = useUser();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [msgType, setMsgType] = useState("");

    useEffect(() => {
        const {msg, type} = status;
        const typeArr = ["success", "info", "warning", "error"];
        
        if (msg && typeArr.includes(type)) {
            setOpen(true);
            setMessage(msg);
            setMsgType(type);
        }
    }, [status])

    const handleClose = (e, reason) => {
        setOpen(false);
    };

    return (
        msgType === ""
        ? null
        : <>
            <Snackbar
                open={open}
                autoHideDuration={1700}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={msgType}>{message}</Alert>
            </Snackbar>
        </>
    )
}

export default SysMessage;