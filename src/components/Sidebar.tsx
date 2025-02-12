"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "./ui/card";
import { getUserByClerkId } from "@/actions/user.action";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import UnauthenticatedSidebar from "./UnauthenticatedSidebar";
import { LinkIcon, MapPinIcon } from "lucide-react";

interface User {
  id: string;
  name: string | null;
  username: string;
  bio: string | null;
  location: string | null;
  website: string | null;
  _count: {
    following: number;
    followers: number;
  };
}

const Sidebar = () => {
  const { user: authUser, isLoaded } = useUser();
  const [user, setUser] = useState<User | null>(() => ({
    id: "",
    name: "Loading...",
    username: "loading...",
    bio: null,
    location: null,
    website: null,
    _count: { following: 0, followers: 0 },
  }));

  useEffect(() => {
    const fetchUser = async () => {
      if (authUser) {
        const fetchedUser = await getUserByClerkId(authUser.id);
        setUser(fetchedUser);
      }
    };

    fetchUser();
  }, [authUser]);

  if (!isLoaded) return null; // Ensures Clerk is fully loaded
  if (!authUser) return <UnauthenticatedSidebar />;
  if (!user) return null;

  return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="w-20 h-20 border-2 ">
                <AvatarImage key={authUser?.imageUrl} src={authUser?.imageUrl || "/avatar.png"} />
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.username}</p>
              </div>
            </Link>

            {user.bio && (
              <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
            )}

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-medium">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {user.location || "No location"}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                {user.website ? (
                  <a
                    href={`${user.website}`}
                    className="hover:underline truncate"
                    target="_blank"
                  >
                    {user.website}
                  </a>
                ) : (
                  "No website"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
