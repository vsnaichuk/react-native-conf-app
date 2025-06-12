import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Platform,
  StyleSheet,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import Icon from "@expo/vector-icons/Ionicons";
import { connect } from "../data/connect";
import { Location } from "../models/Location";
import { loadLocations } from "../data/locations/locations.actions";
import { CustomTheme } from "../res/colors";
import { NavScreenProp } from "../navigation/types";
import { mockLocations } from "../data/mocks";
import * as mapUtils from "../util/map";
import { ThemedText } from "../components/themed/ThemedText";
import { ThemedView } from "../components/themed/ThemedView";

interface StateProps {
  locations: Location[];
}

interface DispatchProps {
  loadLocations: typeof loadLocations;
}

interface MapScreenProps extends StateProps, DispatchProps {}

const MapScreen: React.FC<MapScreenProps> = ({ locations, loadLocations }) => {
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation<NavScreenProp<"Map">>();
  const mapRef = useRef<MapView>(null);
  const opacity = useRef(new Animated.Value(0)).current;

  // Use mock data if no real data is available
  const displayLocations = locations?.length > 0 ? locations : mockLocations;

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  useEffect(() => {
    if (displayLocations.length && mapRef.current) {
      const region = mapUtils.getInitialRegion(displayLocations);
      mapRef.current.setCamera({
        center: { latitude: region.latitude, longitude: region.longitude },
        zoom: 16,
      });
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [displayLocations, opacity]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ThemedView
        style={[
          styles.header,
          {
            borderBottomColor: colors.border,
            backgroundColor: colors.card,
          },
        ]}
      >
        <TouchableOpacity style={styles.button} onPress={navigation.openDrawer}>
          <Icon name="menu" size={24} color={colors.text} />
        </TouchableOpacity>
        <ThemedText preset="lg" weight="semiBold" style={styles.headerTitle}>
          Map
        </ThemedText>
        <ThemedView style={styles.headerSpacer} />
      </ThemedView>

      <Animated.View style={[styles.mapContainer, { opacity }]}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={
            Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          initialRegion={mapUtils.getInitialRegion(displayLocations)}
          customMapStyle={[]}
          showsUserLocation={false}
          zoomControlEnabled={true}
          mapType="standard"
        >
          {displayLocations.map((location) => (
            <Marker
              key={location.id.toString()}
              coordinate={{ latitude: location.lat, longitude: location.lng }}
              title={location.name}
              accessibilityLabel={location.name}
            />
          ))}
        </MapView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    zIndex: 10,
    ...Platform.select({
      ios: {
        paddingTop: 19,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  button: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 40,
  },
  mapContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    locations: state.locations.locations,
  }),
  mapDispatchToProps: {
    loadLocations,
  },
  component: React.memo(MapScreen),
});
