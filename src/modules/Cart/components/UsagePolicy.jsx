import React from "react";
import { Link } from "react-router-dom";

export const UsagePolicy = () => (
  <div className="mt-12 py-8 border-t border-gray-700 text-gray-400 text-sm">
    <h2 className="text-lg font-semibold mb-4">Usage Policy</h2>
    <p className="mb-2">
      All digital artworks purchased are for personal use only. Commercial redistribution or modification
      without explicit permission from the artist is prohibited.
    </p>
    <p className="mb-2">
      By completing your purchase, you agree to respect the intellectual property rights of the creators.
    </p>
    <p>
      For any queries regarding commercial use or licensing, please contact the artist directly.
    </p>
    <Link to="/privacy" className="text-blue-400 hover:underline mt-4 block">Privacy Policy</Link>
  </div>
);