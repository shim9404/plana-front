import { TripInfoProvider } from "./TripInfoContext";
import { TripRegionProvider } from "./TripRegionContext";
import { TripDateProvider } from "./TripDateContext";
import { PlanUIProvider } from "./PlanUIContext";
import { PlaceSearchProvider } from "./PlaceSearchContext";
import { PlanBookmarkProvider } from "./PlanBookmarkContext";
import { PlanDaysProvider } from "./PlanDaysContext";
import { EditScheduleProvider } from "./EditScheduleContext";

const TripPlanProviders = ({ children }) => {
  return (
    <TripInfoProvider>
      <TripRegionProvider>
        <TripDateProvider>
          <PlanUIProvider>
            <PlaceSearchProvider>
              <PlanBookmarkProvider>
                <PlanDaysProvider>
                  <EditScheduleProvider>
                    {children}
                  </EditScheduleProvider>
                </PlanDaysProvider>
              </PlanBookmarkProvider>
            </PlaceSearchProvider>
          </PlanUIProvider>
        </TripDateProvider>
      </TripRegionProvider>
    </TripInfoProvider>
  );
};

export default TripPlanProviders;