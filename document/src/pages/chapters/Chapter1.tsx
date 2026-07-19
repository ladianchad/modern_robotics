import {InlineMath} from "../../components/math/Tex";
import CSpacePreview2R from "../../components/pages/chapter1/CSpacePreview2R";
import OpenVsClosedChain from "../../components/pages/chapter1/OpenVsClosedChain";
import {useChapterNav} from "../../libs/nav";

// 사이트에 페이지가 있는 챕터만 클릭 가능한 카드로, 책에만 있는 챕터는 dim 카드로 구분한다.
const ROADMAP: Array<{n: number; title: string; blurb: string}> = [
    {
        n: 2, title: "Configuration Space",
        blurb: "How many numbers describe a robot's pose? DOF of bodies and mechanisms, " +
            "Grübler's formula, the shape (topology) of the C-space, task space and workspace.",
    },
    {
        n: 3, title: "Rigid-Body Motions",
        blurb: "Rotation matrices SO(3) and transforms SE(3), exponential coordinates " +
            "(rotate about ω̂ by θ), and screw theory: twists and wrenches.",
    },
    {
        n: 4, title: "Forward Kinematics",
        blurb: "Joint values in, end-effector pose out — the product of exponentials (PoE) " +
            "formula, needing only a base frame and an end-effector frame.",
    },
    {
        n: 5, title: "Velocity Kinematics and Statics",
        blurb: "The Jacobian maps joint rates to end-effector twists; singularities, " +
            "manipulability ellipsoids, and static force analysis all follow from it.",
    },
    {
        n: 6, title: "Inverse Kinematics",
        blurb: "Desired pose in, joint values out. Closed-form solutions for special 6-DOF " +
            "arms and Jacobian-based numerical iteration for everything else.",
    },
    {
        n: 7, title: "Kinematics of Closed Chains",
        blurb: "Mechanisms with loops (five-bar, Stewart–Gough): multiple forward-kinematics " +
            "solutions, passive joints, and richer singularity behavior.",
    },
    {
        n: 8, title: "Dynamics of Open Chains",
        blurb: "The forces and torques behind the motion: Lagrangian and recursive " +
            "Newton–Euler formulations of the equations of motion.",
    },
    {
        n: 9, title: "Trajectory Generation",
        blurb: "Turning a path into a motion: polynomial and trapezoidal time scalings and " +
            "smooth trajectories through timed via points.",
    },
];

const BOOK_ONLY: Array<{n: number; title: string; blurb: string}> = [
    {n: 10, title: "Motion Planning", blurb: "collision-free paths: grids, sampling, potential fields"},
    {n: 11, title: "Robot Control", blurb: "motion, force, hybrid, and impedance control"},
    {n: 12, title: "Grasping and Manipulation", blurb: "contact models, form and force closure"},
    {n: 13, title: "Wheeled Mobile Robots", blurb: "nonholonomic constraints, odometry, mobile manipulation"},
];

const Chapter1 = () => {
    const {go} = useChapterNav();
    return (
        <>
            <p>
                This book is about the <strong>mechanics</strong>, <strong>planning</strong>, and{" "}
                <strong>control</strong> of robot mechanisms — robot arms, wheeled vehicles, and arms
                mounted on wheeled vehicles. Robotics also draws on artificial intelligence and computer
                perception, but the essential feature of a robot is that it <em>moves in the physical
                world</em>; that is where these notes stay focused. This chapter previews the ideas the
                following chapters build on.
            </p>

            <h2>What Is a Robot?</h2>
            <p>
                A robot mechanism is built from rigid bodies, called <strong>links</strong>, connected by{" "}
                <strong>joints</strong> so that relative motion between adjacent links is possible.{" "}
                <strong>Actuators</strong> (typically electric motors) drive the joints, causing the robot to
                move and to exert forces.
            </p>
            <p>
                The links may be arranged in a serial <strong>open chain</strong> — the familiar robot arm,
                where <em>every</em> joint is actuated — or they may form <strong>closed loops</strong>, as in
                the Stewart–Gough platform used in flight simulators, where only a subset of the joints is
                actuated and the rest are <strong>passive</strong>: their motion is dictated by the
                requirement that every loop stay closed. Watch the difference below — the serial arm's three
                joints move independently, while the four-bar loop on the right is driven entirely by its
                one actuated crank.
            </p>
            <OpenVsClosedChain/>
            <p>
                Real links flex, and real joints have elasticity, backlash, friction, and hysteresis.
                Throughout this book we ignore those effects and treat every link as a perfect{" "}
                <strong>rigid body</strong> — an assumption that makes the elegant geometry of the coming
                chapters possible.
            </p>

            <h2>Actuators, Transmissions, and Sensors</h2>
            <p>
                A quick look at the technology the theory will command. Joints are moved by{" "}
                <strong>actuators</strong> — most often DC or AC electric motors, but also stepper motors,
                pneumatic or hydraulic cylinders, and shape-memory alloys. An ideal motor would be light,
                spin slowly (hundreds of RPM), and produce large torque; real motors do the opposite, so a{" "}
                <strong>transmission</strong> (gears, cable drives, belts and pulleys) provides speed
                reduction and torque amplification. A good transmission has little slippage and little{" "}
                <strong>backlash</strong> — the free play at the output when the input is held still.
            </p>
            <p>
                To be controlled, a robot must also sense its own motion: <strong>encoders</strong>,
                potentiometers, or resolvers measure displacement at each revolute or prismatic joint, and
                tachometers measure velocity. Force–torque sensors read the loads at the joints or at the
                end-effector, while cameras, RGB-D sensors, and laser range finders localize the robot and
                the objects around it.
            </p>

            <h2>Configuration and Degrees of Freedom</h2>
            <p>
                The <strong>configuration</strong> of a robot is a specification of the position of{" "}
                <em>every one of its points</em>. For rigid bodies this takes remarkably few numbers: a body
                confined to the plane needs three <InlineMath math='(x, y, \theta)'/>, and a body in space
                needs six (three for position, three for orientation).
            </p>
            <p>
                The minimum number of coordinates needed is the number of{" "}
                <strong>degrees of freedom</strong> (DOF), and the set of all configurations is the{" "}
                <strong>configuration space</strong> (C-space); the DOF is its dimension. For the 2R arm
                below, two joint angles pin down every point of both links, so the C-space is
                two-dimensional: the square of all pairs <InlineMath math='(\theta_1, \theta_2)'/>. Since
                each axis is really a circle (<InlineMath math='\pm 180^\circ'/> are the same angle), the
                square's opposite edges glue together — the C-space is a <strong>torus</strong>, a first
                hint that C-spaces have <em>shapes</em>, not just dimensions.
            </p>
            <CSpacePreview2R/>
            <p>
                A robot's DOF is the sum of its links' freedoms minus the constraints imposed by its joints
                — for open chains this is simply the number of joints, while for closed chains the loop
                constraints remove freedoms (the four-bar above has four joints but only <em>one</em> DOF).
                Making this bookkeeping precise is where the next chapter begins.
            </p>

            <h2>Chapter Roadmap</h2>
            <p>
                The notes follow the book's development. Chapters 2 and 3 lay the foundations
                (configurations and rigid-body motions), Chapters 4–7 build kinematics on top of them,
                Chapter 8 adds dynamics, and Chapter 9 turns motions into executable trajectories. Click a
                card to jump in.
            </p>
            <div className="card-grid">
                {ROADMAP.map(({n, title, blurb}) => (
                    <div key={n} className="doc-card clickable" role="button" tabIndex={0}
                         onClick={() => go(n)}
                         onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && go(n)}>
                        <div className="dc-head">
                            <span className="dc-num">{n}</span>
                            <span className="dc-title">{title}</span>
                        </div>
                        <p className="text-sm text-muted m-0">{blurb}</p>
                    </div>
                ))}
            </div>
            <p>
                The book continues with four chapters not (yet) covered by these notes:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
                {BOOK_ONLY.map(({n, title, blurb}) => (
                    <li key={n}>
                        <strong>Ch.{n} · {title}</strong> — {blurb}.
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Chapter1
