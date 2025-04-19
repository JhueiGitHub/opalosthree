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
