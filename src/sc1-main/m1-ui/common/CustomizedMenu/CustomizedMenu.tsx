import * as React from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { Navigate } from "react-router-dom";
import { PATH } from "../../Main/Pages";

const ITEM_HEIGHT = 48;

export const LongMenu = (props: { cardPackId: string | undefined }) => {
    const [learn, setLearn] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const packId = props.cardPackId;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (learn) return <Navigate to={PATH.LEARN + "/" + packId} />;

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                    },
                }}
            >
                <MenuItem onClick={() => setLearn(true)}>
                    <SchoolRoundedIcon style={{ paddingRight: "8px" }} />
                    Learn
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <BorderColorRoundedIcon style={{ paddingRight: "8px" }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <DeleteForeverRoundedIcon style={{ paddingRight: "8px" }} />
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
};
