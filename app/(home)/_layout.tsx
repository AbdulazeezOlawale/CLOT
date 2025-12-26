import HomeIcon from "@/assets/icons/HomeIcon";
import NotificationIcon from "@/assets/icons/NotificationIcon";
import OrderIcon from "@/assets/icons/OrderIcon";
import TabFavIcon from "@/assets/icons/TabFavIcon";
import { Tabs } from "expo-router";

const HomeLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { paddingTop: 10 },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#8E6CEF",
        tabBarInactiveTintColor: "#272727",
      }}
    >
      <Tabs.Screen
        name="HomePage"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="Notification"
        options={{
          title: "Notification",
          tabBarIcon: ({ color }) => (
            <NotificationIcon size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => <OrderIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Favourite"
        options={{
          title: "Favourite",
          tabBarIcon: ({ color }) => <TabFavIcon size={28} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;
