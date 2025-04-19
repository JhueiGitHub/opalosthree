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
            cosmosmembers: {
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

export const getCosmosFolders = async (cosmosId: string) => {
  try {
    const isCosmosFolders = await client.cosmosFolder.findMany({
      where: {
        cosmosId,
      },
      include: {
        _count: {
          select: {
            cosmosvideos: true,
          },
        },
      },
    });
    if (isCosmosFolders && isCosmosFolders.length > 0) {
      return { status: 200, data: isCosmosFolders };
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
    const cosmosVideos = await client.cosmosVideo.findMany({
      where: {
        OR: [{ cosmosId }, { cosmosfolderId: cosmosId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        CosmosFolder: {
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

    if (cosmosVideos && cosmosVideos.length > 0) {
      return { status: 200, data: cosmosVideos };
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
            cosmostype: true,
          },
        },
        cosmosmembers: {
          select: {
            Cosmos: {
              select: {
                id: true,
                name: true,
                cosmostype: true,
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
