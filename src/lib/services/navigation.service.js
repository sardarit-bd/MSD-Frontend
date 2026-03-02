class NavigationService {
  constructor() {
    this.CACHE_KEY = "navigation_data";
    this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
    this.isBrowser = typeof window !== "undefined";
    this.pendingPromise = null;
  }

  async getNavigation(forceRefresh = false) {
    if (this.pendingPromise) {
      return this.pendingPromise;
    }

    try {
      this.pendingPromise = this._fetchNavigation(forceRefresh);
      return await this.pendingPromise;
    } finally {
      this.pendingPromise = null;
    }
  }

  async _fetchNavigation(forceRefresh = false) {
    try {
      if (!forceRefresh && this.isBrowser) {
        const cached = this.getFromCache();
        if (cached) return cached;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/nodes/navigation`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch navigation");
      }

      const data = await response.json();

      const transformed = this.transformNavigationData(data);

      if (this.isBrowser) {
        this.saveToCache(transformed);
      }

      return transformed;
    } catch (error) {
      console.error("Navigation error:", error);
      return [];
    }
  }

  transformNavigationData(apiData) {
    if (!Array.isArray(apiData)) return [];

    // Only take root sections
    const sections = apiData.filter(
      (node) => node.type === "section"
    );

    return [
      {
        name: "MEDICAL TOPICS",
        slug: "medical-topics",
        megaMenu: {
          sections: [
            {
              title: "Index",
              type: "alphabet",
              items: this.generateAlphabet(sections),
            },
            {
              title: "Sections",
              type: "list",
              columns: this.splitIntoColumns(sections),
            },
          ],
        },
      },
      {
        name: "RESOURCES",
        slug: "resources",
        megaMenu: null,
      },
      {
        name: "COMMENTARY",
        slug: "commentary",
        megaMenu: null,
      },
      {
        name: "PROCEDURES",
        slug: "procedures",
        megaMenu: null,
      },
      {
        name: "QUIZZES",
        slug: "quizzes",
        megaMenu: null,
      },
    ];
  }

  generateAlphabet(sections = []) {
    const letters = new Set();

    sections.forEach((section) => {
      if (section?.title) {
        letters.add(section.title.charAt(0).toUpperCase());
      }
    });

    return Array.from(letters).sort();
  }

  splitIntoColumns(sections = []) {
    const midpoint = Math.ceil(sections.length / 2);

    const firstColumn = sections.slice(0, midpoint).map((item) => ({
      title: item.title,
      slug: item.slug,
    }));

    const secondColumn = sections.slice(midpoint).map((item) => ({
      title: item.title,
      slug: item.slug,
    }));

    return [firstColumn, secondColumn];
  }

  getFromCache() {
    if (!this.isBrowser) return null;

    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);

      if (Date.now() - timestamp > this.CACHE_DURATION) {
        localStorage.removeItem(this.CACHE_KEY);
        return null;
      }

      return data;
    } catch {
      return null;
    }
  }

  saveToCache(data) {
    if (!this.isBrowser) return;

    localStorage.setItem(
      this.CACHE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  }

  clearCache() {
    if (!this.isBrowser) return;
    localStorage.removeItem(this.CACHE_KEY);
  }
}

const navigationService = new NavigationService();
export default navigationService;