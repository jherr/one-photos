import { Text, YStack } from "tamagui";
import { useLoader } from "one";

import { PageContainer } from "~/code/ui/PageContainer";

export async function loader() {
  return {
    title: "Photos App",
  };
}

export default function AboutPage() {
  const { title } = useLoader(loader);

  return (
    <PageContainer>
      <YStack
        gap="$4"
        $platform-native={{ marginTop: 100, paddingLeft: 10, paddingRight: 10 }}
      >
        <Text fontSize="$8" fontWeight="bold">
          This Awesome {title}
        </Text>
        <Text fontSize="$6">
          This is a really cool photos app built with React Native and Tamagui.
        </Text>
      </YStack>
    </PageContainer>
  );
}
