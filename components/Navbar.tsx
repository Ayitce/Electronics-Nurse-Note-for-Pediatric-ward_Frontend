import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { useAuth } from "@/_auth";
import Divider from "@mui/material/Divider";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar(props: {
  isLoggedIn?: boolean,
  item?: any,
  fixed?: boolean,
}) {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const [open, setOpen] = useState(false);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar
      elevation={0}
      position={props.fixed ? "fixed" : "static"} >
      <Toolbar>
        <Typography
          onClick={() => router.push("/")}
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: 'pointer'
          }}>
          Electronics Nurse Note for Pediatric Ward
        </Typography>
        {
          !props.isLoggedIn &&
          <Button
            sx={{ color: "white" }}
            color="inherit"
            onClick={handleClickOpen}
            size="large"
          >
            สมัครสมาชิก
          </Button>
        }
        {props.item}
        <Divider
          orientation="vertical"
          sx={{ height: 30, backgroundColor: "#FFFFFF", mx: 1 }}
        />
        {!props.isLoggedIn ? (
          <Button href="/signin" color="inherit" endIcon={<LoginIcon />}>
            เข้าสู่ระบบ
          </Button>
        ) : (
          <Button
            onClick={handleLogout}
            color="inherit"
            endIcon={<LogoutIcon />}
          >
            ออกจากระบบ
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
