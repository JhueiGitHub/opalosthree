"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { logEvent } from "@/redux/slices/debug";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Modal from "@/components/modal";
import { PlusCircle } from "lucide-react";
import Search from "@/components/search";
import MenuBarItem from "@/components/desktop/menu-bar-item";
import CosmosPlaceholder from "@/components/desktop/cosmos-placeholder";
import GlobalCard from "@/components/global/global-card";
import { Button } from "@/components/ui/button";
import InfoBar from "@/components/global/info-bar";
import { MENU_ITEMS } from "@/constants";

// Placeholder types - replace with actual types
type Member = { Cosmos: { id: string; name: string } }; // Simplified placeholder
type Subscription = { plan: "FREE" | "PRO" }; // Simplified placeholder
type NotificationCount = { _count: { notification: number } }; // Simplified placeholder
type WorkspaceDetail = { members: Member[]; subscription: Subscription | null }; // Combined placeholder

// Placeholder fetch functions - replace with actual implementations
const fetchWorkspaceDetails = async (
  cosmosId: string
): Promise<WorkspaceDetail | null> => {
  console.log(`Placeholder: Fetching details for cosmos ${cosmosId}`);
  // Replace with actual API call
  // Mock data for demonstration:
  if (cosmosId === "mock-pro-public-id") {
    return {
      members: [{ Cosmos: { id: "member-cosmos-1", name: "Shared Cosmos 1" } }],
      subscription: { plan: "PRO" },
    };
  }
  if (cosmosId === "mock-free-public-id") {
    return {
      members: [],
      subscription: { plan: "FREE" },
    };
  }
  return { members: [], subscription: { plan: "FREE" } }; // Default mock
};

const fetchNotifications = async (): Promise<NotificationCount> => {
  console.log("Placeholder: Fetching notifications");
  // Replace with actual API call
  return { _count: { notification: 3 } }; // Mock data
};

const OpalApp = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  // Get activeCosmosId from URL
  const activeCosmosId = pathname.split("/")[2];

  // Get workspaces list from Redux
  const workspaces = useAppSelector((state) => state.workspaces.workspaces);

  // Local state for data not in current Redux setup
  const [workspaceDetails, setWorkspaceDetails] =
    useState<WorkspaceDetail | null>(null);
  const [notificationCount, setNotificationCount] =
    useState<NotificationCount | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);

  // Derived state: Find the current cosmos object from the Redux list
  const currentCosmos = workspaces.find(
    (workspace) => workspace.id === activeCosmosId
  );

  // Define menu items based on active ID
  const menuItems = MENU_ITEMS(activeCosmosId);

  // Fetch workspace details (members, subscription) when activeCosmosId changes
  useEffect(() => {
    if (activeCosmosId) {
      setIsLoadingDetails(true);
      fetchWorkspaceDetails(activeCosmosId)
        .then((details) => {
          setWorkspaceDetails(details);
          setIsLoadingDetails(false);
        })
        .catch((error) => {
          console.error("Failed to fetch workspace details:", error);
          setIsLoadingDetails(false);
          // Handle error appropriately
        });
    }
  }, [activeCosmosId]);

  // Fetch notifications
  useEffect(() => {
    setIsLoadingNotifications(true);
    fetchNotifications()
      .then((count) => {
        setNotificationCount(count);
        setIsLoadingNotifications(false);
      })
      .catch((error) => {
        console.error("Failed to fetch notifications:", error);
        setIsLoadingNotifications(false);
        // Handle error appropriately
      });
  }, []); // Fetch once on mount

  // Log that the Opal app is displaying a specific cosmos
  useEffect(() => {
    dispatch(
      logEvent({
        message: `Opal app displaying cosmos: ${activeCosmosId}`,
        data: {
          cosmosId: activeCosmosId,
          cosmosName: currentCosmos?.name || "Unknown",
          timestamp: new Date().toISOString(),
        },
      })
    );
  }, [activeCosmosId, currentCosmos, dispatch]);

  // Event Handlers
  const onChangeActiveWorkspace = (value: string) => {
    // Navigate to the new workspace URL - Redux action would be better if activeId was in store
    router.push(`/desktop/${value}`);
  };

  // Loading state or render UI
  if (isLoadingDetails || isLoadingNotifications) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Destructure details for easier access, provide defaults
  const members = workspaceDetails?.members ?? [];
  const subscription = workspaceDetails?.subscription ?? null;
  const count = notificationCount;

  return (
    <div className="w-full h-full flex">
      <div className="w-[270px] h-full bg-black bg-opacity-30 rounded-sm p-[6px] flex flex-col">
        <Select
          defaultValue={activeCosmosId}
          onValueChange={onChangeActiveWorkspace}
        >
          <SelectTrigger className="w-full text-neutral-400 bg-transparent mb-2">
            <SelectValue placeholder="Select a Cosmos" />
          </SelectTrigger>
          <SelectContent className="bg-[#111111] backdrop-blur-xl">
            <SelectGroup>
              <SelectLabel>Cosmos'</SelectLabel>
              <Separator />
              {workspaces.map((cosmos) => (
                <SelectItem key={cosmos.id} value={cosmos.id}>
                  {cosmos.name}
                </SelectItem>
              ))}
              {members.length > 0 &&
                members.map(
                  (member) =>
                    member.Cosmos && (
                      <SelectItem
                        key={member.Cosmos.id}
                        value={member.Cosmos.id}
                      >
                        {member.Cosmos.name} (Shared)
                      </SelectItem>
                    )
                )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {currentCosmos?.type === "PUBLIC" && subscription?.plan == "PRO" && (
          <Modal
            trigger={
              <span className="text-sm pt-[6px] cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                <PlusCircle
                  size={15}
                  className="text-neutral-800/90 fill-neutral-500"
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite To Cosmos
                </span>
              </span>
            }
            title="Invite To Cosmos"
            description="Invite other users to your cosmos"
          >
            <Search cosmosId={activeCosmosId} />
          </Modal>
        )}

        <p className="w-full text-[#9D9D9D] font-bold mt-4 pl-1">Menu</p>
        <nav className="w-full">
          <ul>
            {menuItems.map((item) => (
              <MenuBarItem
                href={item.href}
                icon={item.icon}
                selected={pathname === item.href}
                title={item.title}
                key={item.title}
                notifications={
                  (item.title === "Notifications" &&
                    count?._count?.notification) ||
                  0
                }
              />
            ))}
          </ul>
        </nav>
        <Separator className="w-full my-2" />

        <p className="w-full text-[#9D9D9D] font-bold mt-4 pl-1">
          Other Cosmos
        </p>

        {workspaces.length === 1 && members.length === 0 && (
          <div className="w-full mt-[6px] pl-1">
            <p className="text-[#3C3C3C] font-medium text-sm">
              {subscription?.plan === "FREE"
                ? "Upgrade to create cosmos"
                : "No Other Cosmos"}
            </p>
          </div>
        )}

        <nav className="w-full flex-1">
          <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
            {workspaces.length > 0 &&
              workspaces.map(
                (item) =>
                  item.id !== activeCosmosId &&
                  item.type !== "PERSONAL" && (
                    <MenuBarItem
                      href={`/desktop/${item.id}`}
                      selected={pathname === `/desktop/${item.id}`}
                      title={item.name}
                      notifications={0}
                      key={item.id}
                      icon={
                        <CosmosPlaceholder>
                          {item.name.charAt(0)}
                        </CosmosPlaceholder>
                      }
                    />
                  )
              )}
            {members.length > 0 &&
              members.map((item) => (
                <MenuBarItem
                  href={`/desktop/${item.Cosmos.id}`}
                  selected={pathname === `/desktop/${item.Cosmos.id}`}
                  title={item.Cosmos.name}
                  notifications={0}
                  key={item.Cosmos.id}
                  icon={
                    <CosmosPlaceholder>
                      {item.Cosmos.name.charAt(0)}
                    </CosmosPlaceholder>
                  }
                />
              ))}
          </ul>
        </nav>

        <div className="relative w-full mt-auto">
          {subscription?.plan === "FREE" && (
            <GlobalCard
              title="Upgrade to Pro"
              description="Unlock AI features like transcription, AI summary, and more."
              footer={
                <Button className="text-sm w-full mt-2 bg-[#4C4F69]">
                  Upgrade
                </Button>
              }
            />
          )}
        </div>
      </div>
      <div className="h-full w-full flex flex-col">
        <InfoBar />
        <div className="flex-grow p-4">
          <h2 className="text-xl font-semibold">
            Content for {currentCosmos?.name || "Cosmos"}
          </h2>
          <p>Active Cosmos ID: {activeCosmosId}</p>
        </div>
      </div>
    </div>
  );
};

export default OpalApp;
