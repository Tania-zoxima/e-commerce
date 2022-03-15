import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import GenericIcon from "App/Components/GenericIcon";
import { HelperService } from "App/Services/Utils/HelperService";
import { Spinner } from "native-base";
import { Colors, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/FontAwesome";
export default class MultipleImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
    };
  }

  componentDidMount() {
    this.setState({
      sources: this.props.images,
    });
  }

  async chooseFile() {
    var options = {
      title: "Select Image",
      quality: 0.9,
      maxWidth: 1080,
      maxHeight: 1080,
      mediaType: "photo",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    let permission = await HelperService.requestMultipleStoragePermission();
    let cameraPermission = await HelperService.requestCameraPermission();

    if (permission && cameraPermission) {
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
          alert(response.customButton);
        } else {
          // console.log("amannnnnn", response);
          const source = { uri: response.uri };
          let sources = [].concat(this.state.sources);
          sources.push(response.uri);

          this.setState({
            sources: sources,
          });
          const file = {
            uri: response.uri,
            name: response.fileName,
            type: "image/jpeg",
          };
          this.props.onImageSuccess({ images: response.uri });
        }
      });
    } else {
      Alert.alert(
        "Storage permission Denied.",
        'If you have denied permanently then Go "App Permissions" and Turn on "Storage" Permission for JKApp.'
      );
    }
  }

  onClearImage() {
    this.setState({
      sources: [],
    });

    this.props.onClearImage();
  }

  render() {
    const { images, children, loading, title } = this.props;

    let image_sources =
      this.state.sources && this.state.sources.length
        ? this.state.sources
        : images;
    let imageNode = image_sources.map((url) => (
      <FastImage
        source={{ uri: url }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.stretch}
      />
    ));
    let loading_node = [];

    if (loading) {
      loading_node = (
        <View style={styles.spinner}>
          <Spinner color={Colors.primary} />
          <Text style={{ color: Colors.primary }}>Processing Image...</Text>
        </View>
      );
    }

    return (
      <View style={styles.uploadContainer}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Text style={styles.title}>{`${title}`}</Text>
            {images.length ? (
              <Icon
                name={"times-circle-o"}
                style={styles.removeIcon}
                onPress={() => this.onClearImage()}
              />
            ) : (
              []
            )}
          </View>
          <View style={styles.imagePreviewContainer}>{imageNode}</View>
          {loading_node}
        </View>
        <View>
          <TouchableOpacity
            disabled={loading}
            onPress={!this.props.enable ? () => this.chooseFile() : () => {}}
            style={styles.uploadButton}
          >
            <Icon name={"plus"} style={styles.addIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.firozi,
    elevation: 3,
    paddingVertical: hp("1%"),
    borderStyle: "dashed",
  },
  addIcon: {
    color: Colors.primary,
    fontSize: wp("7%"),
    zIndex:1000,
  },
  removeIcon: {
    color: Colors.primary,
    fontSize: wp("6.5%"),
    paddingTop: 0,
  },
  uploadButton: {},
  uploadContainer: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    position: "relative",
    minHeight: hp("8%"),
  },
  title: {
    fontSize: wp("3.5%"),
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.primary,
    fontWeight: "bold",
    paddingHorizontal: wp("2%"),
    flexWrap: "wrap",
    width: "90%",
  },
  image: {
    width: hp("8%"),
    height: hp("8%"),
    resizeMode: "stretch",
    borderRadius: 10,
    marginHorizontal: wp("1.5%"),
    marginVertical: wp("1.5%"),
  },
  spinner: {
    marginVertical: 0,
    position: "absolute",
    backgroundColor: "rgba(232, 229, 229, 0.5)",
    height: "117%",
    width: "100%",
    zIndex: 2,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
  },
});
