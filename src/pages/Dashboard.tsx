import { type ReactElement, type ReactNode } from "react";
import { StatCard } from "../components/ui/StatCard";
import { EventCarousel } from "../components/EventCarousel";

interface ActivitySectionProps {
  title: string;
  children: ReactNode;
}

interface DashboardHeaderProps {
  name: string;
}

/**
 * Header component for the dashboard
 */
const DashboardHeader = ({ name }: DashboardHeaderProps): ReactElement => (
  <header className="mb-8">
    <h1 className="text-4xl font-bold text-white mb-2">Welcome Back, {name}</h1>
    <p className="text-gray-400">
      Here&apos;s what&apos;s happening at Lodge2A
    </p>
  </header>
);

/**
 * Stats grid component showing user statistics
 */
const StatsGrid = (): ReactElement => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatCard title="Upcoming Reservations" value="3" icon="calendar" />
    <StatCard title="Events This Week" value="5" icon="events" />
    <StatCard title="Average Score" value="82" icon="score" />
    <StatCard title="Pro Shop Points" value="1,250" icon="points" />
  </div>
);

/**
 * Activity section component with title and content
 */
const ActivitySection = ({
  title,
  children,
}: ActivitySectionProps): ReactElement => (
  <section className="bg-gray-800 rounded-2xl p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <button type="button" className="text-gray-400 hover:text-white">
        View All
      </button>
    </div>
    {children}
  </section>
);

/**
 * Activities grid component containing recent activity and upcoming events
 */
const ActivitiesGrid = (): ReactElement => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ActivitySection title="Recent Activity">
      <div>{/* Activity list content */}</div>
    </ActivitySection>
    <ActivitySection title="Upcoming Events">
      <div>{/* Events list content */}</div>
    </ActivitySection>
  </div>
);

/**
 * Dashboard page component that displays user stats and activities
 */
export default function Dashboard(): ReactElement {
  return (
    <div className="min-h-screen pb-20 tablet:pb-0">
      <div className="p-6 lg:p-8">
        <DashboardHeader name="John" />
        <StatsGrid />

        {/* Event Carousel Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Upcoming Events
          </h2>
          <div className="w-full overflow-hidden">
            <EventCarousel />
          </div>
        </section>

        <ActivitiesGrid />
      </div>
    </div>
  );
}
