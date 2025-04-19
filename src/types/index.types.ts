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
    member: {
      Cosmos: {
        id: string;
        name: string;
        plan: "PUBLIC" | "PERSONAL";
      }[];
    };
  };
};
