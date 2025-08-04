export interface MaterialInfo {
  name: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
  commonUses: string[];
  keyProperties: {
    strength: string;
    durability: string;
    cost: string;
    sustainability: string;
  };
}

export const MATERIALS_INFO: Record<string, MaterialInfo> = {
  "Reinforced Concrete": {
    name: "Reinforced Concrete",
    description: "A composite material made of concrete and steel reinforcement, combining the compressive strength of concrete with the tensile strength of steel.",
    advantages: [
      "High compressive strength",
      "Fire resistance",
      "Durability",
      "Versatility in form",
      "Cost-effective for large structures"
    ],
    disadvantages: [
      "Heavy weight",
      "Limited tensile strength without reinforcement",
      "Cracking potential",
      "Long curing time",
      "Carbon footprint"
    ],
    commonUses: [
      "High-rise buildings",
      "Bridges",
      "Dams",
      "Foundations",
      "Parking structures"
    ],
    keyProperties: {
      strength: "High compressive strength (20-50 MPa)",
      durability: "50-100 years with proper maintenance",
      cost: "Moderate to high",
      sustainability: "High embodied carbon, but long service life"
    }
  },
  "Pre-stressed Concrete": {
    name: "Pre-stressed Concrete",
    description: "Concrete in which internal stresses are introduced to counteract external loads, typically using high-strength steel tendons.",
    advantages: [
      "Higher load capacity",
      "Reduced cracking",
      "Longer spans possible",
      "Thinner sections",
      "Better crack control"
    ],
    disadvantages: [
      "Complex construction process",
      "Higher initial cost",
      "Specialized equipment needed",
      "Skilled labor required",
      "Quality control critical"
    ],
    commonUses: [
      "Long-span bridges",
      "Parking structures",
      "Industrial buildings",
      "Nuclear containment",
      "Marine structures"
    ],
    keyProperties: {
      strength: "Very high compressive strength (40-80 MPa)",
      durability: "75-100 years with proper maintenance",
      cost: "High",
      sustainability: "Similar to reinforced concrete"
    }
  },
  "Structural Steel": {
    name: "Structural Steel",
    description: "A construction material made from steel that is formed into specific shapes and sizes for structural support.",
    advantages: [
      "High strength-to-weight ratio",
      "Quick construction",
      "Ductility",
      "Recyclable",
      "Quality control"
    ],
    disadvantages: [
      "Fire protection needed",
      "Corrosion potential",
      "Higher cost",
      "Thermal expansion",
      "Noise transmission"
    ],
    commonUses: [
      "High-rise buildings",
      "Industrial facilities",
      "Bridges",
      "Stadiums",
      "Airport terminals"
    ],
    keyProperties: {
      strength: "High tensile and compressive strength",
      durability: "50+ years with proper maintenance",
      cost: "High",
      sustainability: "Highly recyclable"
    }
  },
  "Composite Steel-Concrete": {
    name: "Composite Steel-Concrete",
    description: "A structural system that combines the benefits of steel and concrete, typically using steel beams with concrete slabs.",
    advantages: [
      "Optimal use of materials",
      "Reduced floor depth",
      "Fire resistance",
      "Stiffness",
      "Cost-effective"
    ],
    disadvantages: [
      "Complex connections",
      "Quality control critical",
      "Specialized design needed",
      "Coordination required",
      "Higher initial cost"
    ],
    commonUses: [
      "Office buildings",
      "Parking structures",
      "Bridges",
      "Industrial facilities",
      "Multi-story buildings"
    ],
    keyProperties: {
      strength: "Very high combined strength",
      durability: "50-75 years",
      cost: "Moderate to high",
      sustainability: "Good, combines benefits of both materials"
    }
  },
  "Timber": {
    name: "Timber",
    description: "Wood that has been processed into beams and planks for construction purposes.",
    advantages: [
      "Renewable resource",
      "Low carbon footprint",
      "Good thermal properties",
      "Aesthetic appeal",
      "Easy to work with"
    ],
    disadvantages: [
      "Limited span lengths",
      "Fire resistance concerns",
      "Moisture sensitivity",
      "Insect vulnerability",
      "Strength variability"
    ],
    commonUses: [
      "Residential buildings",
      "Low-rise commercial",
      "Bridges",
      "Interior structures",
      "Temporary structures"
    ],
    keyProperties: {
      strength: "Moderate strength, varies by species",
      durability: "20-50 years with proper treatment",
      cost: "Moderate",
      sustainability: "Excellent, renewable resource"
    }
  },
  "Masonry": {
    name: "Masonry",
    description: "Building structures from individual units of brick, stone, or concrete blocks, bound together by mortar.",
    advantages: [
      "Durability",
      "Fire resistance",
      "Sound insulation",
      "Thermal mass",
      "Low maintenance"
    ],
    disadvantages: [
      "Labor intensive",
      "Limited tensile strength",
      "Heavy weight",
      "Slow construction",
      "Seismic vulnerability"
    ],
    commonUses: [
      "Residential buildings",
      "Historical structures",
      "Retaining walls",
      "Chimneys",
      "Load-bearing walls"
    ],
    keyProperties: {
      strength: "High compressive strength, low tensile strength",
      durability: "100+ years",
      cost: "Moderate",
      sustainability: "Good, long-lasting"
    }
  },
  "Aluminum": {
    name: "Aluminum",
    description: "A lightweight, corrosion-resistant metal used in structural applications where weight is a critical factor.",
    advantages: [
      "Lightweight",
      "Corrosion resistant",
      "High strength-to-weight ratio",
      "Recyclable",
      "Easy to fabricate"
    ],
    disadvantages: [
      "Higher cost",
      "Lower stiffness",
      "Fatigue sensitivity",
      "Thermal expansion",
      "Limited availability"
    ],
    commonUses: [
      "Space frames",
      "Curtain walls",
      "Bridges",
      "Marine structures",
      "Aircraft hangars"
    ],
    keyProperties: {
      strength: "Moderate strength, high strength-to-weight ratio",
      durability: "50+ years",
      cost: "High",
      sustainability: "Excellent, highly recyclable"
    }
  },
  "Glass-Steel": {
    name: "Glass-Steel",
    description: "A modern structural system combining glass panels with steel framing for transparent or semi-transparent structures.",
    advantages: [
      "Aesthetic appeal",
      "Natural light",
      "Modern appearance",
      "Design flexibility",
      "Energy efficiency"
    ],
    disadvantages: [
      "High cost",
      "Complex detailing",
      "Maintenance requirements",
      "Thermal concerns",
      "Security considerations"
    ],
    commonUses: [
      "Modern facades",
      "Atriums",
      "Skylights",
      "Greenhouses",
      "Exhibition spaces"
    ],
    keyProperties: {
      strength: "Depends on glass type and steel support",
      durability: "25-50 years",
      cost: "Very high",
      sustainability: "Moderate, energy efficient but high embodied energy"
    }
  },
  "Fiber Reinforced Polymer (FRP)": {
    name: "Fiber Reinforced Polymer (FRP)",
    description: "A composite material made of a polymer matrix reinforced with fibers, typically glass, carbon, or aramid.",
    advantages: [
      "High strength-to-weight ratio",
      "Corrosion resistance",
      "Design flexibility",
      "Quick installation",
      "Low maintenance"
    ],
    disadvantages: [
      "High cost",
      "UV sensitivity",
      "Limited fire resistance",
      "Quality control critical",
      "Limited long-term data"
    ],
    commonUses: [
      "Bridge rehabilitation",
      "Seismic retrofitting",
      "Marine structures",
      "Industrial facilities",
      "Specialty structures"
    ],
    keyProperties: {
      strength: "Very high strength-to-weight ratio",
      durability: "20-30 years (estimated)",
      cost: "Very high",
      sustainability: "Moderate, depends on resin type"
    }
  },
  "Bamboo": {
    name: "Bamboo",
    description: "A rapidly renewable grass that can be used as a structural material, particularly in sustainable construction.",
    advantages: [
      "Rapidly renewable",
      "High strength-to-weight ratio",
      "Low carbon footprint",
      "Aesthetic appeal",
      "Local availability"
    ],
    disadvantages: [
      "Limited standardization",
      "Moisture sensitivity",
      "Fire resistance concerns",
      "Limited span lengths",
      "Treatment required"
    ],
    commonUses: [
      "Low-rise buildings",
      "Temporary structures",
      "Interior elements",
      "Scaffolding",
      "Sustainable projects"
    ],
    keyProperties: {
      strength: "High tensile strength, moderate compressive strength",
      durability: "10-20 years with proper treatment",
      cost: "Low to moderate",
      sustainability: "Excellent, rapidly renewable"
    }
  }
}; 