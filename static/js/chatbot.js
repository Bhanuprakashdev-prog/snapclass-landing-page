// SnapClass AI Chatbot - Personalized & Domain-Restricted
// Only answers SnapClass platform related questions
(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════
    // SNAPCLASS KNOWLEDGE BASE (From Training Document V3/V4)
    // ═══════════════════════════════════════════════════════════
    const KNOWLEDGE_BASE = [
        // ── GENERAL ──
        {
            keywords: ['what is snapclass', 'snapclass kya hai', 'about snapclass', 'tell me about snapclass', 'snapclass platform', 'what does snapclass do'],
            answer: 'SnapClass is an AI-powered attendance management platform that uses Face Recognition and Voice Recognition to automate attendance. It supports both teachers and students with dedicated portals.'
        },
        {
            keywords: ['who can use', 'users', 'user roles', 'roles', 'who uses snapclass'],
            answer: 'SnapClass supports two user roles: **Teacher** and **Student**. No administrator role currently exists.'
        },
        {
            keywords: ['web application', 'is snapclass web', 'browser', 'app type', 'web based'],
            answer: 'Yes, SnapClass is a web-based attendance management platform. Users can access it through a browser without any installation.'
        },
        {
            keywords: ['technologies', 'tech stack', 'technology used', 'built with', 'what technologies', 'backend', 'frontend'],
            answer: 'SnapClass uses: **Streamlit** & **Flask** (Frontend/Platform), **Python** (Backend), **Supabase** (Cloud PostgreSQL Database), **Dlib** & **Scikit-Learn SVM** (Face Recognition), **Resemblyzer** & **Librosa** (Voice Recognition), and **NumPy** for numerical processing. It is deployed on **Streamlit Cloud** and **Vercel**.'
        },
        {
            keywords: ['installation', 'install', 'download', 'setup'],
            answer: 'No installation is required. SnapClass is a web-based platform that you can access directly through your browser.'
        },
        {
            keywords: ['problem solved', 'why snapclass', 'purpose', 'what problem'],
            answer: 'SnapClass eliminates manual attendance and automates the entire process using AI-powered Face Recognition and Voice Recognition technology.'
        },
        {
            keywords: ['cloud', 'cloud based', 'data storage', 'where is data stored'],
            answer: 'Yes, SnapClass is cloud-based. All data is stored in the Supabase cloud PostgreSQL database.'
        },
        {
            keywords: ['qr enrollment', 'qr code', 'qr support'],
            answer: 'Yes, SnapClass supports QR enrollment. Teachers can generate and share QR codes for students to join subjects instantly.'
        },
        {
            keywords: ['identify students', 'automatic identification', 'recognize students'],
            answer: 'Yes, SnapClass uses Face Recognition to automatically identify registered students from classroom photos. It can also identify students using Voice Recognition if they have enrolled voice samples.'
        },

        // ── HOME PAGE ──
        {
            keywords: ['home page', 'landing page', 'main page', 'first page', 'opening page'],
            answer: 'When users open SnapClass, they see the home page with two options: **Student Portal** button and **Teacher Portal** button. Students choose Student Portal and Teachers choose Teacher Portal.'
        },
        {
            keywords: ['landing page sections', 'landing page includes', 'website sections'],
            answer: 'The SnapClass Landing Page includes: Hero Section, Features Section, Teacher Journey, Student Journey, Technology Stack, Call To Action, and Footer. Its purpose is to introduce SnapClass and guide users into the platform.'
        },

        // ── TEACHER REGISTRATION ──
        {
            keywords: ['teacher register', 'teacher registration', 'create teacher account', 'teacher signup', 'teacher sign up', 'how to register teacher', 'teacher account'],
            answer: 'To create a teacher account:\n1. Open **Teacher Portal**\n2. Click **Register Instead**\n3. Enter Username\n4. Enter Name\n5. Enter Password\n6. Confirm Password\n7. Click **Register Now**\n\nPasswords are secured using bcrypt hashing.'
        },
        {
            keywords: ['teacher registration info', 'registration fields', 'what info for teacher'],
            answer: 'Teacher registration requires: Username, Name, Password, and Confirm Password.'
        },
        {
            keywords: ['same username', 'duplicate username', 'username unique'],
            answer: 'No, two teachers cannot use the same username. Usernames must be unique.'
        },
        {
            keywords: ['username exists', 'username already taken', 'username already exists'],
            answer: 'If a username already exists, registration will fail and you will be asked to choose a different username.'
        },
        {
            keywords: ['password encrypted', 'password secure', 'password hashing', 'bcrypt', 'password security'],
            answer: 'Yes, all passwords are stored securely using **bcrypt hashing**.'
        },
        {
            keywords: ['multiple teacher accounts', 'multiple accounts'],
            answer: 'Yes, teachers can register multiple accounts if different usernames are used.'
        },
        {
            keywords: ['email verification', 'email verify', 'verify email'],
            answer: 'No, email verification is not currently implemented in SnapClass.'
        },
        {
            keywords: ['otp', 'otp required', 'one time password'],
            answer: 'No, OTP is not required for registration or login in SnapClass.'
        },
        {
            keywords: ['change username', 'edit username', 'update username'],
            answer: 'This feature is not currently documented in the SnapClass knowledge base.'
        },

        // ── TEACHER LOGIN ──
        {
            keywords: ['teacher login', 'how to login teacher', 'teacher sign in', 'teacher portal login'],
            answer: 'To login as a teacher:\n1. Open **Teacher Portal**\n2. Enter your **Username**\n3. Enter your **Password**\n4. Click **Login**\n\nIf credentials are valid, the Teacher Dashboard opens.'
        },
        {
            keywords: ['wrong password', 'incorrect password', 'login failed', 'wrong credentials'],
            answer: 'If you enter the wrong password, login will fail and access will be denied.'
        },
        {
            keywords: ['forget password', 'forgot password', 'reset password', 'password recovery'],
            answer: 'Password reset is not currently documented in the SnapClass knowledge base.'
        },
        {
            keywords: ['teacher faceid', 'teacher face login', 'can teacher use faceid'],
            answer: 'No, teachers cannot login using FaceID. Teachers use username and password for authentication.'
        },
        {
            keywords: ['teacher login secure', 'is login secure'],
            answer: 'Yes, teacher login is secure. Passwords are hashed using bcrypt.'
        },
        {
            keywords: ['logout', 'log out', 'sign out'],
            answer: 'Yes, a Logout button is available for teachers to sign out of their accounts.'
        },

        // ── TEACHER DASHBOARD ──
        {
            keywords: ['teacher dashboard', 'dashboard tabs', 'teacher panel', 'after login teacher'],
            answer: 'The Teacher Dashboard contains three main sections:\n• **Take Attendance** - For conducting face/voice attendance\n• **Manage Subjects** - For creating and managing subjects\n• **Attendance Records** - For viewing attendance reports'
        },

        // ── SUBJECT MANAGEMENT ──
        {
            keywords: ['create subject', 'new subject', 'add subject', 'how to create subject', 'make subject'],
            answer: 'To create a subject:\n1. Login as Teacher\n2. Open **Manage Subjects**\n3. Click **Create New Subject**\n4. Enter Subject Code\n5. Enter Subject Name\n6. Enter Section\n7. Click **Create Subject Now**\n\nThe subject becomes available immediately.'
        },
        {
            keywords: ['subject fields', 'subject code', 'what is subject code'],
            answer: 'When creating a subject, you need to provide: **Subject Code** (a unique identifier used for enrollment), **Subject Name**, and **Section**. Subject codes should be unique.'
        },
        {
            keywords: ['duplicate subject', 'same subject code', 'subject code unique'],
            answer: 'Subject codes should be unique. Two subjects should not have the same code.'
        },
        {
            keywords: ['multiple subjects', 'create many subjects'],
            answer: 'Yes, teachers can create multiple subjects.'
        },
        {
            keywords: ['subjects stored', 'where subjects saved'],
            answer: 'Subjects are stored in the Supabase database.'
        },
        {
            keywords: ['total students subject', 'how many students', 'student count'],
            answer: 'Yes, teachers can see the total number of students enrolled in a subject.'
        },
        {
            keywords: ['total classes', 'classes conducted', 'class count'],
            answer: 'Yes, teachers can see the total number of classes conducted for a subject.'
        },

        // ── SHARE SUBJECT ──
        {
            keywords: ['share subject', 'share code', 'share qr', 'enrollment link', 'how students join', 'share with students'],
            answer: 'Teachers can share subjects with students using three methods:\n• **Subject Code** - Students enter the code manually\n• **Enrollment Link** - Share a direct link\n• **QR Code** - Students scan to join\n\nSteps: Open Manage Subjects → Click Share Code → Copy Subject Code / Share QR / Share Enrollment Link.'
        },

        // ── STUDENT LOGIN ──
        {
            keywords: ['student login', 'student sign in', 'how student login', 'student portal login', 'student faceid login'],
            answer: 'Students login using **FaceID**:\n1. Open **Student Portal**\n2. Capture your Face\n3. AI scans the image\n\nPossible outcomes:\n• **Face Recognized** → Student Dashboard opens\n• **Face Not Recognized** → Registration Form appears'
        },
        {
            keywords: ['student password', 'student need password', 'password student'],
            answer: 'No, students do not need a password. Students login exclusively using FaceID.'
        },
        {
            keywords: ['face not recognized', 'face not detected', 'face failed'],
            answer: 'If your face is not recognized, a Registration Form will appear for you to create a new account. Make sure your face is clearly visible and only one face is in the camera frame.'
        },

        // ── STUDENT REGISTRATION ──
        {
            keywords: ['student register', 'student registration', 'create student account', 'student signup', 'how to register student'],
            answer: 'To register as a student:\n1. Capture your Face\n2. Enter your Name\n3. Optional: Record Voice for Voice Enrollment\n4. Click **Create Account**\n\nThe system generates a Face Embedding (and optionally a Voice Embedding) and creates your profile.'
        },
        {
            keywords: ['faceid required', 'face scan required', 'register without face'],
            answer: 'Yes, FaceID (face scan) is required for student registration. You cannot register without a face scan.'
        },
        {
            keywords: ['voice enrollment required', 'voice mandatory', 'is voice required'],
            answer: 'No, voice enrollment is optional. Students can register with just their face scan.'
        },
        {
            keywords: ['what stored registration', 'data stored student', 'student data'],
            answer: 'During registration, SnapClass stores: Face Embedding, Name, and optionally a Voice Embedding.'
        },

        // ── VOICE ENROLLMENT ──
        {
            keywords: ['voice enrollment', 'voice enroll', 'enroll voice', 'voice sample', 'voice registration'],
            answer: 'Voice Enrollment is optional. Steps:\n1. Record a voice sample\n2. Speak a phrase\n3. Submit audio\n\nThe system creates a voice embedding, and Voice Attendance becomes available for that student.'
        },

        // ── STUDENT DASHBOARD ──
        {
            keywords: ['student dashboard', 'student panel', 'student features', 'what can student do', 'student capabilities'],
            answer: 'On the Student Dashboard, students can:\n• View enrolled Subjects\n• View Attendance Count\n• View Total Classes\n• View Attended Classes\n• Enroll In Subject\n• Leave Subject\n\nStudents **cannot**: Edit Attendance, Create Subjects, or Access Teacher Portal.'
        },

        // ── SUBJECT ENROLLMENT ──
        {
            keywords: ['join subject', 'enroll subject', 'enroll in subject', 'subject enrollment', 'how to join subject', 'enter subject code'],
            answer: 'Students can join a subject using three methods:\n\n**Method 1 - Subject Code:**\n1. Student Dashboard → Click "Enroll In Subject"\n2. Enter Subject Code → Click "Enroll Now"\n\n**Method 2 - QR Code:**\n1. Scan QR Code → Open Enrollment Link → Login → Confirm\n\n**Method 3 - Enrollment Link:**\n1. Open Shared Link → Login → Confirm Enrollment'
        },
        {
            keywords: ['leave subject', 'unenroll', 'drop subject', 'quit subject', 'remove subject'],
            answer: 'Yes, students can leave a subject by clicking **"Unenroll from this course"** on their dashboard.'
        },
        {
            keywords: ['rejoin subject', 'join again', 'enroll again'],
            answer: 'Yes, students can rejoin a subject later if they have the subject code.'
        },
        {
            keywords: ['multiple subjects enroll', 'enroll many subjects'],
            answer: 'Yes, students can enroll in multiple subjects.'
        },
        {
            keywords: ['invalid code', 'wrong code', 'code not working', 'subject code invalid'],
            answer: 'If the subject code is invalid, enrollment will fail. Please verify the code with your teacher.'
        },
        {
            keywords: ['qr enrollment login', 'qr need login'],
            answer: 'Yes, QR enrollment requires you to be logged in as a student.'
        },
        {
            keywords: ['enrollment immediate', 'instant enrollment'],
            answer: 'Yes, enrollment is immediate after confirmation.'
        },

        // ── FACE RECOGNITION SYSTEM ──
        {
            keywords: ['face recognition', 'face technology', 'how face recognition works', 'face detection', 'face system', 'facial recognition'],
            answer: 'SnapClass Face Recognition uses:\n• **Dlib** for face detection\n• **Scikit-Learn SVM** for classification\n• Generates **128-dimensional face embeddings**\n\nWorkflow: Capture Image → Detect Face → Generate 128D Embedding → Compare With Database → Identify Student\n\nRecognition Threshold: **0.35** (lower distance = better match).'
        },
        {
            keywords: ['face embedding', '128d', 'embedding vector'],
            answer: 'SnapClass generates a 128-dimensional face embedding for each student using Dlib. This embedding is compared against stored embeddings in the database for identification.'
        },
        {
            keywords: ['recognition threshold', 'face threshold', '0.35'],
            answer: 'The face recognition threshold is **0.35**. A lower distance indicates a better match between the captured face and stored embeddings.'
        },

        // ── FACE ATTENDANCE ──
        {
            keywords: ['take attendance', 'face attendance', 'how to take attendance', 'attendance process', 'mark attendance', 'start attendance'],
            answer: 'To take Face Attendance:\n1. Login as Teacher\n2. Open **Take Attendance**\n3. Select Subject\n4. Click **Add Photos**\n5. Upload Classroom Photos\n6. Click **Run Face Analysis**\n7. AI Detects Students\n8. Attendance Preview Appears\n9. Review Results\n10. Click **Confirm And Save**\n\nAttendance is stored in the database.'
        },
        {
            keywords: ['multiple photos', 'upload many photos', 'classroom photos'],
            answer: 'Yes, you can upload multiple classroom photos for face attendance analysis.'
        },
        {
            keywords: ['camera photos', 'use camera', 'take photo camera'],
            answer: 'Yes, you can use camera photos for attendance.'
        },
        {
            keywords: ['after upload', 'analysis process'],
            answer: 'After uploading photos, Face Analysis scans all classroom images to identify enrolled students using their stored face embeddings.'
        },
        {
            keywords: ['no face detected', 'face not found in photo'],
            answer: 'If no face is detected, attendance cannot be generated for that image. Ensure faces are clearly visible and the camera image is clear.'
        },
        {
            keywords: ['multiple faces', 'many faces', 'group photo'],
            answer: 'The system attempts to identify all visible students when multiple faces are detected in classroom photos.'
        },

        // ── VOICE ATTENDANCE ──
        {
            keywords: ['voice attendance', 'voice recognition attendance', 'audio attendance', 'use voice attendance'],
            answer: 'To take Voice Attendance:\n1. Teacher Login\n2. Select Subject\n3. Click **Use Voice Attendance**\n4. Record Classroom Audio\n5. Click **Analyze Audio**\n6. AI Identifies Students\n7. Attendance Preview Appears\n8. Confirm Attendance\n\nAttendance is stored in the database.'
        },
        {
            keywords: ['voice library', 'resemblyzer', 'voice technology'],
            answer: 'SnapClass uses **Resemblyzer** and **Librosa** for voice recognition and audio processing.'
        },
        {
            keywords: ['voice threshold', 'voice similarity', '0.65'],
            answer: 'The voice recognition threshold is **0.65** similarity score.'
        },
        {
            keywords: ['voice mandatory attendance', 'only voice attendance'],
            answer: 'No, voice attendance is not mandatory. Teachers can choose between face attendance and voice attendance. They can also use only voice attendance if preferred.'
        },
        {
            keywords: ['no voice profile', 'voice not enrolled'],
            answer: 'If a student has no voice profile (hasn\'t completed voice enrollment), voice attendance cannot identify that student.'
        },
        {
            keywords: ['multiple students speak', 'many voices'],
            answer: 'Yes, multiple students can speak, and the system analyzes the audio automatically.'
        },
        {
            keywords: ['voice not detecting', 'voice attendance not working'],
            answer: 'Ensure that voice enrollment has been completed for the students. Also check that the audio quality is clear and microphone permissions are allowed in the browser.'
        },

        // ── ATTENDANCE REPORTS ──
        {
            keywords: ['attendance report', 'attendance records', 'view attendance', 'attendance history', 'attendance log', 'check attendance'],
            answer: 'Teachers can view attendance reports containing:\n• Student Names\n• Subject\n• Subject Code\n• Attendance Status\n• Attendance Counts\n• Session History\n\nReports are available in the **Attendance Records** tab on the Teacher Dashboard.'
        },
        {
            keywords: ['attendance record structure', 'record fields', 'attendance data'],
            answer: 'Each attendance record contains: Student ID, Subject ID, Timestamp, and Attendance Status (true = Present, false = Absent).'
        },
        {
            keywords: ['edit attendance', 'modify attendance', 'change attendance', 'update attendance'],
            answer: 'No documented feature currently supports editing attendance records after saving.'
        },
        {
            keywords: ['attendance stored', 'where attendance saved'],
            answer: 'Attendance records are stored in the Supabase PostgreSQL database.'
        },

        // ── DATABASE ──
        {
            keywords: ['database structure', 'database tables', 'db schema', 'supabase tables', 'database'],
            answer: 'SnapClass Database Structure:\n\n• **teachers** - teacher_id, username, password, name\n• **students** - student_id, name, face_embedding, voice_embedding\n• **subjects** - subject_id, subject_code, name, section, teacher_id\n• **subject_students** - subject_id, student_id\n• **attendance_logs** - id, timestamp, subject_id, student_id, is_present'
        },

        // ── SECURITY ──
        {
            keywords: ['security', 'security features', 'how secure', 'safety', 'data protection'],
            answer: 'SnapClass Security Features:\n\n**Implemented:**\n• Bcrypt Password Hashing\n• Face Biometrics\n• Voice Biometrics\n• Teacher Authentication\n• Secure Database Storage\n\n**Not Yet Implemented:**\n• OTP Login\n• Email Verification\n• Two Factor Authentication'
        },

        // ── TROUBLESHOOTING ──
        {
            keywords: ['troubleshoot', 'problem', 'issue', 'help', 'not working', 'error'],
            answer: 'Common Troubleshooting:\n\n• **Face not detected** → Ensure only one face is visible and camera image is clear\n• **Multiple faces found** → Capture only one face during login\n• **Subject code invalid** → Verify the code provided by teacher\n• **No students enrolled** → Students must enroll before attendance can be taken\n• **Voice attendance not detecting** → Ensure voice enrollment has been completed\n• **Camera not working** → Allow browser camera permissions\n• **Microphone not working** → Allow microphone permissions'
        },
        {
            keywords: ['camera not working', 'camera permission', 'camera issue'],
            answer: 'If your camera is not working, please allow browser camera permissions. Check your browser settings to ensure SnapClass has access to your camera.'
        },
        {
            keywords: ['microphone not working', 'mic permission', 'mic issue'],
            answer: 'If your microphone is not working, please allow microphone permissions in your browser settings.'
        },
        {
            keywords: ['subject not visible', 'cant see subject', 'subject missing'],
            answer: 'If a subject is not visible, verify that you have enrolled in that subject properly.'
        },
        {
            keywords: ['qr not working', 'qr enrollment failed', 'qr issue'],
            answer: 'If QR enrollment is not working, ensure you are logged in as a student before scanning the QR code.'
        },
        {
            keywords: ['attendance not saved', 'save failed', 'attendance lost'],
            answer: 'Make sure you click the **Confirm** button before closing the attendance page. Attendance must be confirmed before it is saved to the database.'
        },

        // ── FUTURE FEATURES ──
        {
            keywords: ['future features', 'upcoming', 'planned features', 'roadmap', 'mobile app', 'email notifications', 'real time tracking', 'analytics dashboard', 'advanced reporting'],
            answer: 'The following features are planned but **not currently implemented**:\n• Mobile Application\n• Email Notifications\n• Real-Time Tracking\n• Advanced Reporting\n• Analytics Dashboard\n\nThese are future plans and are not available yet.'
        },

        // ── DEPLOYMENT ──
        {
            keywords: ['deployment', 'deployed', 'hosting', 'where hosted', 'server'],
            answer: 'SnapClass is deployed on **Streamlit Cloud** (for the main application) and **Vercel** (for the landing page).'
        },

        // ── SUPABASE ──
        {
            keywords: ['supabase', 'postgresql', 'database provider'],
            answer: 'SnapClass uses **Supabase** as its cloud database provider with PostgreSQL. It provides real-time infrastructure with secure auth and sync.'
        },

        // ── DLIB ──
        {
            keywords: ['dlib', 'face detection library'],
            answer: 'SnapClass uses **Dlib** for face detection and generating 128-dimensional face embeddings for student identification.'
        },

        // ── SCIKIT LEARN ──
        {
            keywords: ['scikit-learn', 'sklearn', 'svm', 'machine learning model'],
            answer: 'SnapClass uses **Scikit-Learn SVM** (Support Vector Machine) as the classifier for face recognition matching.'
        },

        // ── STREAMLIT ──
        {
            keywords: ['streamlit', 'streamlit cloud'],
            answer: 'SnapClass\'s main application is built with **Streamlit**, a Python framework for building web applications, and is deployed on Streamlit Cloud.'
        },

        // ── FLASK ──
        {
            keywords: ['flask', 'landing page tech'],
            answer: 'The SnapClass landing page is built using **Flask**, a Python web framework, and is deployed on Vercel.'
        },

        // ── BOTH FACE AND VOICE ──
        {
            keywords: ['both face voice', 'face and voice', 'use both'],
            answer: 'Yes, students can use both Face Recognition and Voice Recognition. Face is required for login/registration, while Voice is optional and provides an additional attendance method.'
        },

        // ── GREETING / HELLO ──
        {
            keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste', 'salam', 'assalam'],
            answer: 'Hello! 👋 I\'m the **SnapClass AI Assistant**. I\'m here to help you with anything related to the SnapClass platform — including attendance, teacher portal, student portal, enrollment, and more. How can I help you today?'
        },
        {
            keywords: ['thank you', 'thanks', 'shukriya', 'dhanyawad'],
            answer: 'You\'re welcome! 😊 If you have any more questions about SnapClass, feel free to ask anytime!'
        },
        {
            keywords: ['bye', 'goodbye', 'see you', 'exit'],
            answer: 'Goodbye! 👋 If you need help with SnapClass in the future, I\'m always here. Have a great day!'
        }
    ];

    // ═══════════════════════════════════════════════════════════
    // DOMAIN RESTRICTION ENGINE V4
    // Two-gate system:
    //   Gate 1 — Unconditional block list (no exceptions)
    //   Gate 2 — SnapClass intent whitelist (query must relate to platform)
    // ═══════════════════════════════════════════════════════════

    // Gate 1: Always-blocked terms — no SnapClass exception
    const BLOCKED_KEYWORDS = [
        // Programming / Coding
        'write a program', 'write code', 'code likhna', 'code likh do', 'code batao',
        'code karo', 'code chahiye', 'source code', 'mujhe code do',
        'coding karo', 'programming karo', 'script likhna', 'function likhna',
        'algorithm', 'data structure', 'leetcode', 'hackerrank', 'codeforces',
        'compile', 'debug karo', 'fix my code', 'error fix karo',
        'sql query', 'database query', 'write query',
        // Languages (standalone, not in SnapClass tech context)
        'java program', 'c++ program', 'javascript code', 'html code', 'css code',
        'react code', 'angular code', 'vue code', 'ruby code', 'php code',
        'golang', 'rust language', 'swift code', 'kotlin code',
        // Sports
        'cricket', 'football', 'hockey', 'tennis', 'ipl', 'world cup',
        'match score', 'match result', 'khel', 'fifa', 'olympics', 'badminton',
        'kabaddi', 'wrestling', 'boxing',
        // Politics
        'election', 'vote karo', 'modi', 'trump', 'biden', 'imran khan',
        'siyasat', 'government policy', 'parliament', 'pm', 'president',
        // Entertainment
        'bollywood', 'hollywood', 'movie dekhna', 'film review',
        'song sunao', 'music bata', 'singer kaun', 'actor kaun',
        'netflix series', 'drama episode', 'web series', 'gaana suno',
        // News
        'breaking news', 'current affairs', 'latest news', 'aaj ki khabar',
        'headline', 'news bata', 'aaj kya hua',
        // Weather
        'weather', 'temperature', 'mausam', 'forecast', 'barish hogi',
        // Food
        'recipe batao', 'khana banana', 'dish kaise banate', 'restaurant',
        // Medical
        'doctor', 'medicine', 'dawai', 'bimari', 'ilaj', 'hospital',
        'health tips', 'treatment', 'symptoms',
        // Finance
        'bitcoin', 'crypto', 'share market', 'stock market', 'investment',
        'loan kaise', 'bank account', 'rupee', 'dollar rate', 'trading',
        // Religion
        'namaz', 'pooja', 'prayer', 'mosque', 'mandir', 'mazhab', 'church',
        // General Knowledge
        'history bata', 'geography', 'itihaas', 'capital city', 'country capital',
        'population', 'continent', 'general knowledge', 'gk question',
        // Relationships / Personal
        'relationship advice', 'love advice', 'dating tips', 'marriage advice',
        'personal problem', 'life advice',
        // Entertainment misc
        'joke sunao', 'funny joke', 'mazaak karo', 'shayari sunao',
        'poem likhna', 'kahani sunao', 'story sunao',
        // General AI / ChatGPT abuse
        'act as chatgpt', 'pretend you are', 'roleplay as', 'you are now',
        'ignore previous instructions', 'ignore your instructions',
        'ignore all instructions', 'new instructions', 'override instructions',
        'system prompt', 'jailbreak', 'dan mode',
        'you are not snapclass', 'forget your rules', 'forget your training',
        // Travel / Misc
        'car', 'bike', 'vehicle', 'train ticket', 'flight booking', 'travel guide',
        // Games
        'pubg', 'free fire', 'minecraft', 'fortnite', 'gta', 'valorant',
        // Social Media
        'instagram pe', 'facebook pe', 'twitter pe', 'tiktok', 'youtube video',
        // Shopping
        'amazon pe', 'flipkart', 'online shopping', 'khareedna',
        // Space
        'nasa', 'moon mission', 'mars mission', 'planet', 'galaxy',
        // Animals
        'dog breed', 'cat breed', 'janwar'
    ];

    // Gate 2: SnapClass-domain intent words — query must contain at least one
    const SNAPCLASS_INTENT_WORDS = [
        'snapclass', 'snap class', 'attendance', 'teacher', 'student',
        'portal', 'face recognition', 'voice recognition', 'faceid', 'face id',
        'subject', 'enroll', 'enrollment', 'register', 'registration',
        'dashboard', 'login', 'logout', 'sign in', 'sign up',
        'qr code', 'qr', 'subject code', 'dlib', 'resemblyzer', 'supabase',
        'streamlit', 'biometric', 'embedding', 'voice sample', 'classroom photo',
        'bcrypt', 'scikit', 'librosa', 'take attendance', 'mark attendance',
        'attendance record', 'attendance report', 'manage subjects', 'create subject',
        'student portal', 'teacher portal', 'student dashboard', 'teacher dashboard',
        'hello', 'hi', 'hey', 'namaste', 'salam', 'assalam',
        'thank', 'thanks', 'bye', 'goodbye', 'help'
    ];

    const REJECTION_MESSAGE = "I'm the **SnapClass AI Assistant** and I can only answer questions related to the SnapClass platform. Please ask me about SnapClass features, attendance, teacher portal, student portal, enrollment, or other platform-related topics. 🎓";
    const FALLBACK_MESSAGE = "This feature is not currently documented in the SnapClass knowledge base. Please try asking about SnapClass features like attendance, registration, enrollment, teacher/student portals, or troubleshooting.";

    // ═══════════════════════════════════════════════════════════
    // ANSWER ENGINE
    // ═══════════════════════════════════════════════════════════

    // Gate 1: unconditional block — no exceptions
    function isBlockedTopic(query) {
        const lowerQuery = query.toLowerCase();
        for (const blocked of BLOCKED_KEYWORDS) {
            if (lowerQuery.includes(blocked.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    // Gate 2: must have at least one SnapClass-intent word
    function hasSnapClassIntent(query) {
        const lowerQuery = query.toLowerCase();
        for (const word of SNAPCLASS_INTENT_WORDS) {
            if (lowerQuery.includes(word.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    function findBestAnswer(query) {
        const lowerQuery = query.toLowerCase().trim();

        // Gate 1 — always reject blocked topics
        if (isBlockedTopic(lowerQuery)) {
            return REJECTION_MESSAGE;
        }

        // Gate 2 — must contain SnapClass-domain intent
        if (!hasSnapClassIntent(lowerQuery)) {
            return REJECTION_MESSAGE;
        }

        let bestMatch = null;
        let bestScore = 0;

        for (const entry of KNOWLEDGE_BASE) {
            for (const keyword of entry.keywords) {
                const lowerKeyword = keyword.toLowerCase();
                let score = 0;

                // Exact match (highest priority)
                if (lowerQuery === lowerKeyword) {
                    score = 100;
                }
                // Query contains the full keyword phrase
                else if (lowerQuery.includes(lowerKeyword)) {
                    score = 70 + (lowerKeyword.length / lowerQuery.length) * 30;
                }
                // Keyword contains the full query
                else if (lowerKeyword.includes(lowerQuery)) {
                    score = 50 + (lowerQuery.length / lowerKeyword.length) * 20;
                }
                // Word-level matching
                else {
                    const queryWords = lowerQuery.split(/\s+/);
                    const keywordWords = lowerKeyword.split(/\s+/);
                    let matchedWords = 0;
                    for (const qw of queryWords) {
                        if (qw.length < 3) continue; // skip tiny words
                        for (const kw of keywordWords) {
                            if (kw.includes(qw) || qw.includes(kw)) {
                                matchedWords++;
                                break;
                            }
                        }
                    }
                    if (matchedWords > 0) {
                        score = (matchedWords / Math.max(queryWords.length, 1)) * 60;
                    }
                }

                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = entry;
                }
            }
        }

        // Require a meaningful match score (raised from 20 to 25)
        if (bestMatch && bestScore >= 25) {
            return bestMatch.answer;
        }

        return FALLBACK_MESSAGE;
    }

    // ═══════════════════════════════════════════════════════════
    // SIMPLE MARKDOWN RENDERER
    // ═══════════════════════════════════════════════════════════
    function renderMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^(\d+)\.\s(.+)/gm, '<div class="sc-chat-list-item"><span class="sc-chat-num">$1.</span> $2</div>')
            .replace(/^• (.+)/gm, '<div class="sc-chat-list-item"><span class="sc-chat-bullet">•</span> $1</div>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
    }

    // ═══════════════════════════════════════════════════════════
    // CREATE CHATBOT UI
    // ═══════════════════════════════════════════════════════════
    function createChatbot() {
        // Chatbot Toggle Button
        const toggleBtn = document.createElement('div');
        toggleBtn.id = 'sc-chatbot-toggle';
        toggleBtn.innerHTML = `
            <div class="sc-toggle-inner">
                <svg class="sc-chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <svg class="sc-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </div>
            <div class="sc-toggle-pulse"></div>
        `;

        // Chatbot Window
        const chatWindow = document.createElement('div');
        chatWindow.id = 'sc-chatbot-window';
        chatWindow.innerHTML = `
            <div class="sc-chat-header">
                <div class="sc-chat-header-left">
                    <div class="sc-chat-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2z"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                        </svg>
                    </div>
                    <div class="sc-chat-header-info">
                        <h4>SnapClass AI</h4>
                        <span class="sc-chat-status"><span class="sc-status-dot"></span>Online</span>
                    </div>
                </div>
                <button class="sc-chat-close" id="sc-chat-close-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="sc-chat-messages" id="sc-chat-messages">
                <div class="sc-chat-msg sc-bot-msg">
                    <div class="sc-msg-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2z"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                        </svg>
                    </div>
                    <div class="sc-msg-bubble">
                        <p>Hello! 👋 I'm the <strong>SnapClass AI Assistant</strong>. Ask me anything about the SnapClass platform — attendance, teacher portal, student portal, enrollment, and more!</p>
                    </div>
                </div>
            </div>
            <div class="sc-chat-suggestions" id="sc-chat-suggestions">
                <button class="sc-suggestion-chip" data-query="What is SnapClass?">What is SnapClass?</button>
                <button class="sc-suggestion-chip" data-query="How to take attendance?">How to take attendance?</button>
                <button class="sc-suggestion-chip" data-query="How do students register?">Student Registration</button>
                <button class="sc-suggestion-chip" data-query="How to create a subject?">Create Subject</button>
            </div>
            <div class="sc-chat-input-area">
                <input type="text" id="sc-chat-input" placeholder="Ask about SnapClass..." autocomplete="off" />
                <button id="sc-chat-send" aria-label="Send message">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(toggleBtn);
        document.body.appendChild(chatWindow);

        // ── EVENT HANDLERS ──
        const messagesContainer = document.getElementById('sc-chat-messages');
        const chatInput = document.getElementById('sc-chat-input');
        const sendBtn = document.getElementById('sc-chat-send');
        const closeBtn = document.getElementById('sc-chat-close-btn');
        const suggestionsContainer = document.getElementById('sc-chat-suggestions');
        const chatIcon = toggleBtn.querySelector('.sc-chat-icon');
        const closeIcon = toggleBtn.querySelector('.sc-close-icon');
        let isOpen = false;

        function toggleChat() {
            isOpen = !isOpen;
            chatWindow.classList.toggle('sc-open', isOpen);
            toggleBtn.classList.toggle('sc-active', isOpen);
            chatIcon.style.display = isOpen ? 'none' : 'block';
            closeIcon.style.display = isOpen ? 'block' : 'none';
            if (isOpen) {
                chatInput.focus();
            }
        }

        toggleBtn.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        function addMessage(text, isUser) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `sc-chat-msg ${isUser ? 'sc-user-msg' : 'sc-bot-msg'}`;

            if (isUser) {
                msgDiv.innerHTML = `
                    <div class="sc-msg-bubble">
                        <p>${text}</p>
                    </div>
                `;
            } else {
                msgDiv.innerHTML = `
                    <div class="sc-msg-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2z"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                        </svg>
                    </div>
                    <div class="sc-msg-bubble">
                        <p>${renderMarkdown(text)}</p>
                    </div>
                `;
            }

            messagesContainer.appendChild(msgDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function showTyping() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'sc-chat-msg sc-bot-msg sc-typing-indicator';
            typingDiv.innerHTML = `
                <div class="sc-msg-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2z"/>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                        <line x1="9" y1="9" x2="9.01" y2="9"/>
                        <line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                </div>
                <div class="sc-msg-bubble">
                    <div class="sc-typing-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            `;
            messagesContainer.appendChild(typingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            return typingDiv;
        }

        function handleSend() {
            const query = chatInput.value.trim();
            if (!query) return;

            // Hide suggestions after first message
            suggestionsContainer.style.display = 'none';

            addMessage(query, true);
            chatInput.value = '';

            // Show typing indicator
            const typingEl = showTyping();

            // Simulate a short "thinking" delay for natural feel
            setTimeout(() => {
                typingEl.remove();
                const answer = findBestAnswer(query);
                addMessage(answer, false);
            }, 600 + Math.random() * 600);
        }

        sendBtn.addEventListener('click', handleSend);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        // Suggestion chips
        document.querySelectorAll('.sc-suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const query = chip.getAttribute('data-query');
                chatInput.value = query;
                handleSend();
            });
        });
    }

    // Initialize chatbot when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createChatbot);
    } else {
        createChatbot();
    }
})();
