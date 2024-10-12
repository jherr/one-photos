import { Text, YStack } from "tamagui";
import { PageContainer } from "~/code/ui/PageContainer";

export default function AboutPage() {
  return (
    <PageContainer>
      <YStack
        gap="$4"
        $platform-native={{ marginTop: 100, paddingLeft: 10, paddingRight: 10 }}
      >
        <Text fontSize="$8" fontWeight="bold">
          This Awesome Photos App
        </Text>
        <Text fontSize="$6">
          This is a really cool photos app built with React Native and Tamagui.
        </Text>
      </YStack>
    </PageContainer>
  );
}
