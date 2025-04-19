type Props = {
  params: {
    cosmosId: string; // Must exactly match the folder name [cosmosId]
  };
  children: React.ReactNode;
};

const CosmosLayout = ({ params, children }: Props) => {
  // You can now use params.cosmosId directly
  return <div className="h-screen w-screen overfl">{children}</div>;
};

export default CosmosLayout;
