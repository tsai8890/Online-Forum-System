import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = ({ title, content, open, setOpen, handleAgree }) => {
    return (
        <Dialog
            open={open}
            onClose={() => {setOpen(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {title ? <DialogTitle>
                {title}
            </DialogTitle> : null}
            {content ? <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent> : null}
            <DialogActions>
                <Button onClick={() => {setOpen(false)}}>No</Button>
                <Button onClick={() => {
                    setOpen(false);
                    handleAgree();
                }} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog;