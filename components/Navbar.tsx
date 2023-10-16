import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { useAuth } from "@/_auth";
import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IProfile, getProfile } from "@/services/userService";
import { ResponseEntity } from "@/services/axios.enp.core.config";

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
  const [profile, setProfile] = useState<any>();


  useEffect(() => {
    //loadPatientFromApi()
    const fetchData = async () => {
      // get the data from the api
      const data = await loadProfileFromAPI()
      console.log("profile", data)
      setProfile(data)
    }

    fetchData()
      // make sure to catch any error
      .catch(console.error);

  }, [])

  const loadProfileFromAPI = async () => {
    const response = await getProfile()
    // setPatientInfo(response.data)
    return response.data


  }
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
            cursor: 'pointer',
            color: "white"
          }}>
          Electronics Nurse Note for Pediatric Ward
        </Typography>
        {props.item}
       
        <div>
          <Typography
            variant="subtitle1"
            component="div"
            align="right"
            sx={{
              flexGrow: 1,
              color: "white"
            }}>
            {profile?.username}

          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            align="right"
            sx={{
              flexGrow: 1,
              color: "white"

            }}>
            {profile?.nurse?.name} {profile?.nurse?.surname}
            {profile?.doctor?.name} {profile?.doctor?.surname}
          </Typography>

        </div>

        <Divider
          orientation="vertical"
          sx={{ height: 30, backgroundColor: "#FFFFFF", mx: 1 }}
        />
        {!props.isLoggedIn ? (
          <div></div>
        ) : (
          <Button
            onClick={handleLogout}
            color="inherit"
            sx={{
              color: "white"
            }}
            endIcon={<LogoutIcon />}
          >
            ออกจากระบบ
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
