import { useState, useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Button, ButtonProps, Text, View, YStack } from "tamagui";
import { DocumentPickerResult } from "expo-document-picker";
import {
  CameraView,
  useCameraPermissions,
  CameraCapturedPicture,
} from "expo-camera";

export default function CameraButton({
  children,
  onChange,
  ...buttonProps
}: ButtonProps & { onChange: (doc: DocumentPickerResult) => Promise<void> }) {
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  return (
    <>
      {showCamera ? (
        <YStack>
          <CameraView
            style={styles.camera}
            facing="front"
            mode="picture"
            ref={cameraRef}
          ></CameraView>
          <Button
            mt="$4"
            marginLeft={5}
            marginRight={5}
            size="$6"
            onPress={async () => {
              const photo: CameraCapturedPicture =
                await cameraRef.current?.takePictureAsync();
              if (photo) {
                const documentPickerResult: DocumentPickerResult = {
                  canceled: false,
                  assets: [
                    {
                      uri: photo.uri,
                      name: photo.uri.split("/").pop() || "photo.jpg",
                      size: photo.uri.length,
                      mimeType: "image/jpeg",
                    },
                  ],
                };
                await onChange(documentPickerResult);
              }
            }}
          >
            <Text>Take Picture</Text>
          </Button>
        </YStack>
      ) : permission?.granted ? (
        <Button
          {...buttonProps}
          onPress={() => {
            setShowCamera(true);
          }}
        >
          {children}
        </Button>
      ) : (
        <View>
          <Text>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    // flex: 1,
    height: "70%",
    // flexDirection: "column",
    width: Dimensions.get("window").width - 10,
    // height: Dimensions.get("window").height - 300,
    marginLeft: 5,
    marginRight: 5,
  },
});
