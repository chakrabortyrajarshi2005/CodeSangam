export default function getJudge0LanguageID (language){
    const languageMap = {
      "C": 50, // GCC 9.2.0
      "CPP": 54, // GCC 9.2.0
      "JAVA": 62, // OpenJDK 13
      "PYTHON": 71, // Python 3.8.1
      "JAVASCRIPT": 63, // Node.js 12.14.0
      "TYPESCRIPT": 74, // TypeScript 3.7.4
      "GOLANG": 60, // Go 1.13.5
      "RUST": 73, // Rust 1.40.0
      "RUBY": 72,        // Ruby 2.7.0
      "PHP": 68,         // PHP 7.4.1
      "SCALA": 81,       // Scala 2.13.2
      "ASSEMBLY": 45,    // Assembly (NASM 2.14.02)
      "CSHARP": 51,      // C# (Mono 6.6.0.161)
      "KOTLIN": 78,      // Kotlin 1.3.70
      "SWIFT": 83,       // Swift 5.2.3
      "SQL": 82,         // SQL (SQLite 3.27.2)
      "R": 80            // R (4.0.0)
    };

    return languageMap[language.toUppercase()]
} 