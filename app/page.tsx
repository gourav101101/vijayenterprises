import HomeExperience from './components/HomeExperience';
import { getSiteContent } from './lib/content';
export const dynamic = 'force-dynamic';
export default async function Home() { return <HomeExperience content={await getSiteContent()} />; }
