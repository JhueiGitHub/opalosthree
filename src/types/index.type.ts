export type CosmosProps = {
  data: {
    subscription: {
      plan: "FREE" | "PRO";
    } | null;
    cosmos: {
      id: string;
      name: string;
      type: "PUBLIC" | "PERSONAL";
    }[];
    cosmosmembers: {
      Cosmos: {
        id: string;
        name: string;
        type: "PUBLIC" | "PERSONAL";
      };
    }[];
  };
};

export type NotificationProps = {
  status: number;
  data: {
    _count: {
      notification: number;
    };
  };
};
