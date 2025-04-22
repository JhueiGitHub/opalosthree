"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToCosmos = async (cosmosId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };

    const isUserInCosmos = await client.cosmos.findUnique({
      where: {
        id: cosmosId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });
    return {
      status: 200,
      data: { cosmos: isUserInCosmos },
    };
  } catch (error) {
    return {
      status: 403,
      data: { cosmos: null },
    };
  }
};

export const getFolders = async (cosmosId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        cosmosId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });
    if (isFolders && isFolders.length > 0) {
      return { status: 200, data: isFolders };
    }
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 403, data: [] };
  }
};

export const getAllUserVideos = async (cosmosId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const videos = await client.video.findMany({
      where: {
        OR: [{ cosmosId }, { folderId: cosmosId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (videos && videos.length > 0) {
      return { status: 200, data: videos };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};

export const getCosmos = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const cosmos = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        cosmos: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            Cosmos: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (cosmos) {
      return { status: 200, data: cosmos };
    }
  } catch (error) {
    return { status: 400 };
  }
};
