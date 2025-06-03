'use client';
import Req from "@/app/utils/Req";
import { useEffect, useState } from "react";

type User = {
  users: Array<{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }>
  meta?: {
    total: number;
    page: number;
    perPage: number;
    pages: number
  };
};
type UseUsersReturnType = {
  user: User;
  loading: boolean;
};

export default function UserHook(): UseUsersReturnType {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({ users: [], meta: { total: 0, page: 0, perPage: 0, pages: 0 } });

  useEffect(() => {
    setLoading(true);
    Req({ uri: 'users' })
      .then(({ data }) => {
        setUser({ users: data.data, meta: data.meta });
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
