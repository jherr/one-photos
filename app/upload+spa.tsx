import { useState } from "react";
import { Stack } from "one";
import { Label, XStack, YStack, Input } from "tamagui";
import { Upload } from "@tamagui/lucide-icons";
import { DocumentPickerResult } from "expo-document-picker";

import { PageContainer } from "~/code/ui/PageContainer";

import CameraView from "~/code/camera";

export default function UploadPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const upload = async (res: DocumentPickerResult) => {
    const file = res.assets?.[0];
    if (file && file.file) {
      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("name", name);
      formData.append("description", description);

      await fetch("/api/upload", {
        method: "post",
        body: formData,
      });

      setName("");
      setDescription("");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Take Photo",
        }}
      />
      <PageContainer>
        <YStack
          $platform-native={{
            pt: 100,
          }}
        >
          <YStack gap="$4" alignItems="left" px="$4">
            <XStack alignItems="center" space="$4">
              <Label fontSize="$8" width={120}>
                Name
              </Label>
              <Input
                flex={1}
                size="$4"
                label="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </XStack>
            <XStack alignItems="center" space="$4">
              <Label fontSize="$8" width={120}>
                Description
              </Label>
              <Input
                flex={1}
                size="$4"
                label="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </XStack>
            <Label fontSize="$8" paddingLeft={5}>
              Upload a photo of your dog
            </Label>
          </YStack>
          <YStack gap="$4" alignItems="left" mt="$4" px="$4">
            <CameraView
              icon={Upload}
              size="$6"
              label="Upload"
              onChange={(files) => {
                return upload(files);
              }}
              width={300}
            ></CameraView>
          </YStack>
        </YStack>
      </PageContainer>
    </>
  );
}
