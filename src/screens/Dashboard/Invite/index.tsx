import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useInvite from "loose-components/src/screens/Dashboard/Invite";
import parseError from "loose-components/src/utils/parseError";
import Loading from "../../../components/Loading";

const Invite = () => {
  const router = useRouter();
  const { code } = router.query;
  const { invite, error } = useInvite({ code });
  const parsedError = parseError(error);
  useEffect(() => {
    if (!!invite && invite[0] === "/") router.push(`/dashboard${invite}`);
  }, [invite]);
  if (parsedError) return <div>{parsedError}</div>;
  return <Loading />;
};

export default Invite;
