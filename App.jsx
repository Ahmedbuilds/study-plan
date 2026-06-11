import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

const PHASES = [
  {
    id: 1,
    weeks: "Wk 1-2",
    title: "Foundation Sprint",
    color: "#00D9FF",
    goal: "Audit gaps · refresh Python/Linux · set up both platforms",
    items: [
      { tag: "THM", text: "Start DevSecOps path - intro + first 2 modules (don't skip ahead)" },
      { tag: "LSD", text: "Onboard LetsDefend -> pick SOC Analyst Learning Path" },
      { tag: "Python", text: "Write/refine 3 scripts: log parser, port scanner, API health-check with retry logic" },
      { tag: "Linux", text: "Deep-dive: file permissions, process management, network tools" },
      { tag: "OWASP", text: "Read OWASP Top 10 official docs - understand each vulnerability class" },
      { tag: "DSA", text: "LeetCode: 2 Easy/day - Arrays, Strings, HashMaps (Python only)" },
    ],
  },
  {
    id: 2,
    weeks: "Wk 3-4",
    title: "Security Core",
    color: "#7C3AED",
    goal: "Build security vocabulary · get tools hands-on",
    items: [
      { tag: "THM", text: "DevSecOps path: SAST module, DAST module, SCA basics" },
      { tag: "LSD", text: "SOC Analyst path: Log Analysis + SIEM basics" },
      { tag: "Docker", text: "Docker fundamentals + scan images with Trivy or Snyk Container" },
      { tag: "CI/CD", text: "GitHub Actions: set up a pipeline with a security gate" },
      { tag: "DSA", text: "LeetCode: 2-3 Medium/day - Two Pointers, Sliding Window, Binary Search" },
    ],
  },
  {
    id: 3,
    weeks: "Wk 5-6",
    title: "DevSecOps Depth",
    color: "#F59E0B",
    goal: "Build a project you can demo in interviews",
    items: [
      { tag: "THM", text: "DevSecOps path: IaC Security, Container Security modules" },
      { tag: "Project", text: "Build: repo -> CI/CD -> SAST -> Docker -> Trivy scan -> deploy" },
      { tag: "LSD", text: "Incident Response scenarios on LetsDefend (3-5 real alert tickets)" },
      { tag: "Cloud", text: "AWS Free Tier: IAM, Security Groups, CloudTrail, GuardDuty basics" },
      { tag: "DSA", text: "LeetCode: Mediums - Trees, Graphs intro, Stack/Queue" },
      { tag: "Design", text: "System Design: load balancing, caching, horizontal scaling, CDN" },
    ],
  },
  {
    id: 4,
    weeks: "Wk 7-8",
    title: "Security Engineering",
    color: "#EF4444",
    goal: "Threat modeling depth · blue-team skills · CVE fluency",
    items: [
      { tag: "THM", text: "SOC Level 1 path: network detection, SIEM rooms, phishing analysis" },
      { tag: "LSD", text: "Threat Hunting path + Malware Analysis intro (2-3 rooms)" },
      { tag: "STRIDE", text: "Do a full STRIDE walkthrough on login and API gateway systems" },
      { tag: "CVE", text: "Pick 3 recent CVEs - explain what broke, root cause, fix" },
      { tag: "DSA", text: "LeetCode: DP intro and Backtracking basics" },
      { tag: "Design", text: "System Design: REST APIs, microservices, indexing + transactions" },
    ],
  },
  {
    id: 5,
    weeks: "Wk 9-10",
    title: "Interview Sprint",
    color: "#10B981",
    goal: "Convert knowledge into interview-ready answers + portfolio",
    items: [
      { tag: "Behavioral", text: "STAR stories: debugging, shipping under pressure, security incident, conflict" },
      { tag: "Mock", text: "Top 10 interview questions per role - answer out loud and time yourself" },
      { tag: "Portfolio", text: "GitHub: DevSecOps project live + README that tells the story clearly" },
      { tag: "DSA", text: "LeetCode: 3 Mediums/day + timed 45-min mock sessions" },
      { tag: "Design", text: "Full system design mocks: URL shortener, rate limiter, auth system" },
      { tag: "THM", text: "Finish outstanding path certifications for LinkedIn" },
    ],
  },
  {
    id: 6,
    weeks: "Wk 11-12",
    title: "Apply & Target",
    color: "#3FB950",
    goal: "Company-specific targeting + aggressive applying",
    items: [
      { tag: "Research", text: "Before every interview: research company security stack and recent issues" },
      { tag: "DSA", text: "Maintain 2-3 LeetCode/day. Focus on company-tagged problems" },
      { tag: "Mock", text: "Book 2 mock interviews on Pramp or interviewing.io" },
      { tag: "LSD", text: "Complete LetsDefend certifications - screenshot for resume and LinkedIn" },
      { tag: "LinkedIn", text: "Update projects, certifications, badges; message target-company people weekly" },
    ],
  },
];

const PLATFORMS = {
  thm: {
    name: "TryHackMe",
    color: "#C11111",
    paths: [
      {
        name: "DevSecOps Path",
        priority: "PRIMARY",
        roles: ["DevSecOps"],
        when: "Wk 1-8",
        desc: "SAST, DAST, SCA, IaC Security, CI/CD Security, Container Security. This is your main path.",
      },
      {
        name: "SOC Level 1",
        priority: "PRIMARY",
        roles: ["Security Eng"],
        when: "Wk 7-9",
        desc: "Log analysis, SIEM, network detection, incident handling. Essential interview vocabulary.",
      },
      {
        name: "Jr Penetration Tester",
        priority: "OPTIONAL",
        roles: ["Security Eng"],
        when: "Wk 10+",
        desc: "Only do first 3-4 modules. Understanding attacker mindset helps you defend.",
      },
    ],
    avoid: "Avoid random standalone rooms. Depth on 2 paths beats shallow completion on 6 paths.",
  },
  lsd: {
    name: "LetsDefend.io",
    color: "#1D6FAF",
    paths: [
      {
        name: "SOC Analyst Learning Path",
        priority: "PRIMARY",
        roles: ["Security Eng", "DevSecOps"],
        when: "Wk 1-8",
        desc: "Alert triage, SIEM hands-on, incident response, and log analysis.",
      },
      {
        name: "Threat Hunting",
        priority: "HIGH",
        roles: ["Security Eng"],
        when: "Wk 7-8",
        desc: "Proactive detection and hypothesis-driven hunting.",
      },
      {
        name: "Malware Analysis Basics",
        priority: "OPTIONAL",
        roles: ["Security Eng"],
        when: "Wk 8-9",
        desc: "Good for senior security roles. Nice-to-have, not critical.",
      },
    ],
    avoid: "LetsDefend is blue-team focused. Do not use it to prep for SWE roles; use that time for LeetCode.",
  },
};

const ROLES = [
  {
    id: "devsecops",
    title: "DevSecOps",
    color: "#00D9FF",
    priority: "HIGH",
    topSkills: [
      "CI/CD security: GitHub Actions, Jenkins, pipeline hardening",
      "Container security: Docker, Kubernetes, image scanning",
      "SAST/DAST tools: SonarQube, Snyk, OWASP ZAP, Semgrep",
      "IaC security: Terraform + tfsec or Checkov",
      "Cloud security: AWS IAM, Security Groups, GuardDuty, CloudTrail",
    ],
    tips: [
      "Design a secure CI/CD pipeline end-to-end.",
      "Know SAST, DAST, SCA, and IAST differences cold.",
      "Have a vulnerability story you found and fixed.",
    ],
  },
  {
    id: "seceng",
    title: "Security Eng",
    color: "#7C3AED",
    priority: "HIGH",
    topSkills: [
      "Threat modeling: STRIDE, PASTA, attack trees",
      "SIEM tools: Splunk, ELK Stack, Microsoft Sentinel",
      "Vulnerability management: CVE triage, CVSS, patch priority",
      "Incident response: lifecycle, runbooks, post-mortems",
      "Security architecture: defense in depth, least privilege",
    ],
    tips: [
      "Rehearse a full STRIDE walkthrough.",
      "Be ready to triage a mock alert in real time.",
      "Cover Defend + Detect + Respond, not only prevention.",
    ],
  },
  {
    id: "swe",
    title: "SWE / SDE",
    color: "#F59E0B",
    priority: "MEDIUM",
    topSkills: [
      "DSA: Arrays, HashMaps, Trees, Graphs, Heaps, Tries",
      "Algorithms: BFS/DFS, Two Pointers, Sliding Window, DP",
      "System Design: scalability, databases, caching, queues",
      "Python depth: OOP, decorators, generators, GIL",
      "REST APIs: idempotency, versioning, pagination",
    ],
    tips: [
      "Target a strong solve rate on LeetCode Mediums.",
      "Always clarify requirements first in system design.",
      "Frame support experience as debugging and reliability.",
    ],
  },
];

const TAG_COLORS = {
  THM: "#C11111",
  LSD: "#1D6FAF",
  Python: "#3776AB",
  Linux: "#E8BE3C",
  OWASP: "#A0050C",
  DSA: "#F59E0B",
  Docker: "#2496ED",
  "CI/CD": "#2088FF",
  Project: "#10B981",
  Cloud: "#FF9900",
  STRIDE: "#7C3AED",
  CVE: "#EF4444",
  Design: "#06B6D4",
  Behavioral: "#8B5CF6",
  Mock: "#EC4899",
  Portfolio: "#3FB950",
  Research: "#00D9FF",
  LinkedIn: "#0A66C2",
};

function TabButton({ active, label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        borderBottomColor: active ? "#00D9FF" : "transparent",
        borderBottomWidth: 2,
        paddingVertical: 12,
        alignItems: "center",
      }}
    >
      <Text style={{ color: active ? "#E6EDF3" : "#8B949E", fontSize: 13, fontWeight: active ? "700" : "500" }}>
        {label}
      </Text>
    </Pressable>
  );
}

function Card({ children, borderColor = "#21262D", style }) {
  return (
    <View
      style={[
        {
          backgroundColor: "#161B22",
          borderColor,
          borderWidth: 1,
          borderRadius: 8,
          padding: 14,
          gap: 8,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

function Badge({ label, color = "#8B949E" }) {
  return (
    <Text
      selectable
      style={{
        alignSelf: "flex-start",
        backgroundColor: `${color}22`,
        borderColor: `${color}55`,
        borderRadius: 4,
        borderWidth: 1,
        color,
        fontSize: 10,
        fontWeight: "800",
        paddingHorizontal: 7,
        paddingVertical: 3,
      }}
    >
      {label}
    </Text>
  );
}

function PlanTab({ expandedPhase, setExpandedPhase }) {
  return (
    <View style={{ gap: 12 }}>
      <Card borderColor="#00D9FF33" style={{ borderLeftColor: "#00D9FF", borderLeftWidth: 3 }}>
        <Text selectable style={{ color: "#00D9FF", fontSize: 11, fontWeight: "800" }}>
          FOCUS STRATEGY
        </Text>
        <Text selectable style={{ color: "#C9D1D9", fontSize: 13, lineHeight: 21 }}>
          DevSecOps + Security Eng share roughly 70% of the same skills. SWE/SDE runs as a parallel daily habit.
          Depth on 2-3 paths beats shallow progress across too many paths.
        </Text>
      </Card>

      <View style={{ flexDirection: "row", gap: 8 }}>
        {[
          { label: "DevSecOps +\nSec Eng", pct: "70%", color: "#00D9FF" },
          { label: "DSA +\nSWE Prep", pct: "20%", color: "#F59E0B" },
          { label: "Behavioral +\nPortfolio", pct: "10%", color: "#3FB950" },
        ].map((item) => (
          <Card key={item.label} style={{ flex: 1, alignItems: "center", paddingHorizontal: 8 }}>
            <Text selectable style={{ color: item.color, fontSize: 22, fontWeight: "800" }}>
              {item.pct}
            </Text>
            <Text selectable style={{ color: "#8B949E", fontSize: 10, lineHeight: 14, textAlign: "center" }}>
              {item.label}
            </Text>
          </Card>
        ))}
      </View>

      <Card>
        <Text selectable style={{ color: "#C9D1D9", fontSize: 12, lineHeight: 20 }}>
          Daily rhythm: 30 min LeetCode, 2-3 hrs platform study, 30 min review/notes. Weekends: project work
          and mock interviews.
        </Text>
      </Card>

      {PHASES.map((phase) => {
        const expanded = expandedPhase === phase.id;
        return (
          <View key={phase.id}>
            <Pressable
              onPress={() => setExpandedPhase(expanded ? null : phase.id)}
              style={{
                backgroundColor: "#161B22",
                borderColor: expanded ? `${phase.color}66` : "#21262D",
                borderWidth: 1,
                borderRadius: 8,
                padding: 14,
                gap: 8,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                <View style={{ flex: 1, gap: 6 }}>
                  <Badge label={phase.weeks} color={phase.color} />
                  <Text selectable style={{ color: "#E6EDF3", fontSize: 15, fontWeight: "700" }}>
                    {phase.title}
                  </Text>
                  <Text selectable style={{ color: "#8B949E", fontSize: 12, lineHeight: 18 }}>
                    {phase.goal}
                  </Text>
                </View>
                <Text style={{ color: "#8B949E", fontSize: 14 }}>{expanded ? "▲" : "▼"}</Text>
              </View>
            </Pressable>

            {expanded ? (
              <View
                style={{
                  backgroundColor: "#0D1620",
                  borderColor: `${phase.color}44`,
                  borderRadius: 8,
                  borderWidth: 1,
                  marginTop: 6,
                  padding: 14,
                  gap: 12,
                }}
              >
                {phase.items.map((item) => (
                  <View key={`${phase.id}-${item.tag}-${item.text}`} style={{ flexDirection: "row", gap: 10 }}>
                    <Badge label={item.tag} color={TAG_COLORS[item.tag]} />
                    <Text selectable style={{ color: "#C9D1D9", flex: 1, fontSize: 13, lineHeight: 20 }}>
                      {item.text}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

function PlatformsTab({ activePlatform, setActivePlatform }) {
  const platform = PLATFORMS[activePlatform];

  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {Object.entries(PLATFORMS).map(([id, item]) => (
          <Pressable
            key={id}
            onPress={() => setActivePlatform(id)}
            style={{
              flex: 1,
              backgroundColor: activePlatform === id ? `${item.color}22` : "#161B22",
              borderColor: activePlatform === id ? item.color : "#21262D",
              borderRadius: 8,
              borderWidth: 1,
              padding: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: activePlatform === id ? item.color : "#8B949E", fontSize: 13, fontWeight: "800" }}>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text selectable style={{ color: "#8B949E", fontSize: 12 }}>
        Recommended paths, in priority order:
      </Text>

      {platform.paths.map((path) => (
        <Card key={path.name}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
            <Text selectable style={{ color: "#E6EDF3", flex: 1, fontSize: 15, fontWeight: "700" }}>
              {path.name}
            </Text>
            <Badge label={path.priority} color={path.priority === "PRIMARY" ? platform.color : "#F59E0B"} />
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {path.roles.map((role) => (
              <Badge key={role} label={role} color="#00D9FF" />
            ))}
            <Badge label={path.when} />
          </View>
          <Text selectable style={{ color: "#8B949E", fontSize: 12, lineHeight: 20 }}>
            {path.desc}
          </Text>
        </Card>
      ))}

      <Card borderColor="#EF444455" style={{ borderLeftColor: "#EF4444", borderLeftWidth: 3 }}>
        <Text selectable style={{ color: "#EF4444", fontSize: 11, fontWeight: "800" }}>
          AVOID
        </Text>
        <Text selectable style={{ color: "#C9D1D9", fontSize: 12, lineHeight: 20 }}>
          {platform.avoid}
        </Text>
      </Card>
    </View>
  );
}

function RolesTab({ activeRole, setActiveRole }) {
  const role = ROLES.find((item) => item.id === activeRole);

  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 6 }}>
        {ROLES.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setActiveRole(item.id)}
            style={{
              flex: 1,
              backgroundColor: activeRole === item.id ? `${item.color}22` : "#161B22",
              borderColor: activeRole === item.id ? item.color : "#21262D",
              borderRadius: 8,
              borderWidth: 1,
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: activeRole === item.id ? item.color : "#8B949E", fontSize: 11, fontWeight: "800" }}>
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text selectable style={{ color: "#E6EDF3", fontSize: 22, fontWeight: "800" }}>
            {role.title}
          </Text>
          <Text selectable style={{ color: "#8B949E", fontSize: 12, marginTop: 3 }}>
            Prepare this track with focused weekly proof-of-work.
          </Text>
        </View>
        <Badge label={role.priority} color={role.color} />
      </View>

      <Text selectable style={{ color: role.color, fontSize: 11, fontWeight: "800" }}>
        KEY SKILLS
      </Text>
      <Card>
        {role.topSkills.map((skill) => (
          <View key={skill} style={{ flexDirection: "row", gap: 8 }}>
            <Text style={{ color: role.color }}>▸</Text>
            <Text selectable style={{ color: "#C9D1D9", flex: 1, fontSize: 13, lineHeight: 20 }}>
              {skill}
            </Text>
          </View>
        ))}
      </Card>

      <Text selectable style={{ color: "#F59E0B", fontSize: 11, fontWeight: "800" }}>
        INTERVIEW TIPS
      </Text>
      {role.tips.map((tip) => (
        <Card key={tip}>
          <Text selectable style={{ color: "#C9D1D9", fontSize: 13, lineHeight: 20 }}>
            {tip}
          </Text>
        </Card>
      ))}
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("plan");
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [activePlatform, setActivePlatform] = useState("thm");
  const [activeRole, setActiveRole] = useState("devsecops");

  return (
    <View style={{ flex: 1, backgroundColor: "#0D1117" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ gap: 18, padding: 18, paddingBottom: 36 }}
      >
        <View style={{ gap: 5, paddingTop: 16 }}>
          <Text selectable style={{ color: "#3FB950", fontSize: 11, fontWeight: "700" }}>
            ~/prep $ cat plan.md
          </Text>
          <Text selectable style={{ color: "#E6EDF3", fontSize: 25, fontWeight: "800" }}>
            8-12 Week Interview Plan
          </Text>
          <Text selectable style={{ color: "#8B949E", fontSize: 13 }}>
            DevSecOps · Security Engineering · SWE · actively applying
          </Text>
        </View>

        <View style={{ borderBottomColor: "#21262D", borderBottomWidth: 1, flexDirection: "row" }}>
          <TabButton active={activeTab === "plan"} label="Phase Plan" onPress={() => setActiveTab("plan")} />
          <TabButton active={activeTab === "platforms"} label="Platforms" onPress={() => setActiveTab("platforms")} />
          <TabButton active={activeTab === "roles"} label="By Role" onPress={() => setActiveTab("roles")} />
        </View>

        {activeTab === "plan" ? (
          <PlanTab expandedPhase={expandedPhase} setExpandedPhase={setExpandedPhase} />
        ) : null}
        {activeTab === "platforms" ? (
          <PlatformsTab activePlatform={activePlatform} setActivePlatform={setActivePlatform} />
        ) : null}
        {activeTab === "roles" ? <RolesTab activeRole={activeRole} setActiveRole={setActiveRole} /> : null}
      </ScrollView>
    </View>
  );
}
