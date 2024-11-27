import TopMark from "./Topmark/page";
import Others from "./other-booklets/page";
import Mocks from "./mocks/page";
import KcseRevision from "./kcse-revision/page";
import Revision2011 from "./2011-booklets/page";

const RevisionBooklets = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-600">Revision Booklets</h1>
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-red-600">Top Mark Booklets</h2>
          <TopMark />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-red-600">Other Booklets</h2>
          <Others />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-red-600">Mock Examinations</h2>
          <Mocks />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-red-600">KCSE Revision</h2>
          <KcseRevision />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-red-600">2011 Revision Booklets</h2>
          <Revision2011 />
        </div>
      </div>
    </div>
  );
};

export default RevisionBooklets;