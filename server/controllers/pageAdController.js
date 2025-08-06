import PageAd from "../models/PageAd.js";
import Advertisement from "../models/Advertisement.js";

export const assignAdToPages = async (req, res) => {
  try {
    const { adId, pages, position } = req.body;

    if (!adId || !Array.isArray(pages) || pages.length === 0 || !position) {
      return res.status(400).json({ message: "Provide adId, a non-empty array of pages, and a position." });
    }

    const normalizedPosition = position.trim().toLowerCase();
    if (!["top", "bottom"].includes(normalizedPosition)) {
      return res.status(400).json({ message: "Position must be either 'top' or 'bottom'." });
    }

    // Check if the ad exists
    const adExists = await Advertisement.findById(adId);
    if (!adExists) {
      return res.status(404).json({ message: "Advertisement not found." });
    }

    const results = [];

    for (const pageRaw of pages) {
      const page = pageRaw.trim().toLowerCase();

      let pageAd = await PageAd.findOne({ page, position: normalizedPosition });

      if (!pageAd) {
        // Create a new entry
        pageAd = new PageAd({ page, position: normalizedPosition, adIds: [adId] });
      } else {
        // Only add if the adId doesn't already exist
        if (!pageAd.adIds.includes(adId)) {
          pageAd.adIds.push(adId);
        }
      }

      await pageAd.save();
      results.push(`${page} (${normalizedPosition})`);
    }

    res.status(200).json({
      success: true,
      message: `Ad assigned to: ${results.join(", ")}`,
    });

  } catch (error) {
    console.error("Error assigning ad to pages:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const getAdsByPage = async (req, res) => {
  const { page, position } = req.query;

  const query = { page };
  if (position) {
    query.position = position;
  }

  const pageAd = await PageAd.findOne(query).populate("adIds");

  if (!pageAd) return res.status(404).json({ message: "No ads found" });

  res.status(200).json({
    page: pageAd.page,
    position: pageAd.position,
    ads: pageAd.adIds,
  });
};



// DELETE /api/pageads
export const deletePageAdAssignments = async (req, res) => {
  const { adId, page, position } = req.body;

  if (!adId || !page || !position) {
    return res.status(400).json({ message: "adId, page, and position are required." });
  }

  try {
    const pageAd = await PageAd.findOne({ page, position });

    if (!pageAd) {
      return res.status(404).json({ message: "Ad assignment not found." });
    }

    // Remove the ad from the assigned ads array
    pageAd.adIds = pageAd.adIds.filter(
      (ad) => ad._id.toString() !== adId.toString()
    );

    await pageAd.save();

    return res.status(200).json({ message: "Ad unassigned successfully." });
  } catch (err) {
    console.error("Error unassigning ad:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



export const getAllPageAds = async (req, res) => {
  try {
    const pageAds = await PageAd.find().populate("adIds");

    res.status(200).json({
      success: true,
      total: pageAds.length,
      data: pageAds
    });

  } catch (error) {
    console.error("Error fetching page ad assignments:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updatePageAdPosition = async (req, res) => {
  try {
    const { page, position } = req.body;

    if (!page || !["top", "bottom"].includes(position)) {
      return res.status(400).json({ message: "Provide valid 'page' and 'position' (top or bottom)." });
    }

    const normalizedPage = page.trim().toLowerCase();

    const pageAd = await PageAd.findOne({ page: normalizedPage });

    if (!pageAd) {
      return res.status(404).json({ message: "PageAd entry not found for the specified page." });
    }

    pageAd.position = position;
    await pageAd.save();

    res.status(200).json({
      success: true,
      message: `Position for page '${normalizedPage}' updated to '${position}'.`,
      data: pageAd
    });

  } catch (error) {
    console.error("Error updating page ad position:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
