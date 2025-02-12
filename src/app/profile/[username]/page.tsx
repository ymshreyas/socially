"use server";

import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import React from "react";
import ProfilePageClient from "./ProfilePageClient";
import { currentUser } from "@clerk/nextjs/server";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const username = await getProfileByUsername(params.username);
  if (!username) return;
  return {
    title: `${username.name ?? username.username}`,
    description: username.bio || `Check out ${username.username}'s profile`,
  };
}
async function ProilePageServer({ params }: { params: { username: string } }) {
  const profile = await currentUser();
  const profiePic = profile?.imageUrl || "/avatar.png";
  const user = await getProfileByUsername(params.username);
  if (!user) notFound();
  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
      profilePic={profiePic}
    />
  );
}

export default ProilePageServer;
