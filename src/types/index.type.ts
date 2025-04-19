export type CosmosProps = {
  data: {
    subscription: {
      plan: "FREE" | "PRO";
    } | null;
    cosmos: {
      id: string;
      name: string;
      plan: "PUBLIC" | "PERSONAL";
    }[];
    cosmosmembers: {
      Cosmos: {
        id: string;
        name: string;
        plan: "PUBLIC" | "PERSONAL";
      };
    }[];
  };
};
