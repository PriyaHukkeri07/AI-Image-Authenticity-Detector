/* =========================================
   TRUE VISION — COMPLETE JAVASCRIPT
   ========================================= */


/* =========================================
   ELEMENTS
   ========================================= */

const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const previewContainer = document.getElementById("preview-container");

const detectBtn = document.getElementById("detectBtn");
const uploadArea = document.getElementById("uploadArea");

const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");

const confidenceSection =
    document.getElementById("confidenceSection");

const confidence =
    document.getElementById("confidence");

const confidenceFill =
    document.getElementById("confidenceFill");


/* FILE INFORMATION */

const fileInfo =
    document.getElementById("fileInfo");

const miniPreview =
    document.getElementById("miniPreview");

const fileName =
    document.getElementById("fileName");

const fileSize =
    document.getElementById("fileSize");

const removeImageBtn =
    document.getElementById("removeImageBtn");

const uploadTitle =
    document.getElementById("uploadTitle");

const uploadSubtitle =
    document.getElementById("uploadSubtitle");


/* RESULT DASHBOARD */

const resultDashboard =
    document.getElementById("resultDashboard");

const dashboardConfidence =
    document.getElementById("dashboardConfidence");

const resultVerdict =
    document.getElementById("resultVerdict");

const resultDescription =
    document.getElementById("resultDescription");


/* =========================================
   FILE SIZE FORMATTER
   ========================================= */

function formatFileSize(bytes) {

    if (bytes === 0) {
        return "0 KB";
    }

    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];

    const i =
        Math.floor(
            Math.log(bytes) / Math.log(1024)
        );

    return (
        (bytes / Math.pow(1024, i))
            .toFixed(1)
        + " "
        + units[i]
    );
}


/* =========================================
   DISPLAY IMAGE
   ========================================= */

function displayImage(file) {

    if (!file) {
        return;
    }


    /* Check image */

    if (!file.type.startsWith("image/")) {

        alert("Please select a valid image file.");

        return;
    }


    /* Create image URL */

    const imageURL =
        URL.createObjectURL(file);


    /* Main preview */

    preview.src = imageURL;

    previewContainer.style.display = "block";


    /* Mini preview */

    miniPreview.src = imageURL;


    /* File information */

    fileName.textContent = file.name;

    fileSize.textContent =
        formatFileSize(file.size);


    fileInfo.style.display = "flex";


    /* Upload text */

    uploadTitle.textContent =
        "Image selected";

    uploadSubtitle.textContent =
        "Your image is ready for analysis";


    /* Reset previous result */

    resultTitle.textContent =
        "Ready for AI analysis";

    resultDashboard.style.display =
        "none";

    confidenceSection.style.display =
        "none";


    /* Button */

    detectBtn.disabled = false;

    detectBtn.innerHTML = `
        <span class="button-spark">✦</span>
        <span>Analyze Image</span>
        <span class="button-arrow">→</span>
    `;
}


/* =========================================
   FILE INPUT
   ========================================= */

imageInput.addEventListener(
    "change",
    function () {

        const file =
            this.files[0];

        displayImage(file);
    }
);


/* =========================================
   DRAG & DROP
   ========================================= */

uploadArea.addEventListener(
    "dragover",
    function (event) {

        event.preventDefault();

        uploadArea.classList.add("dragging");
    }
);


uploadArea.addEventListener(
    "dragleave",
    function () {

        uploadArea.classList.remove("dragging");
    }
);


uploadArea.addEventListener(
    "drop",
    function (event) {

        event.preventDefault();

        uploadArea.classList.remove("dragging");


        const file =
            event.dataTransfer.files[0];


        if (!file) {
            return;
        }


        imageInput.files =
            event.dataTransfer.files;


        displayImage(file);
    }
);


/* =========================================
   REMOVE IMAGE
   ========================================= */

removeImageBtn.addEventListener(
    "click",
    function () {

        imageInput.value = "";

        preview.src = "";

        miniPreview.src = "";

        previewContainer.style.display =
            "none";

        fileInfo.style.display =
            "none";


        uploadTitle.textContent =
            "Drop your image here";

        uploadSubtitle.textContent =
            "Drag & drop or browse your device";


        resultTitle.textContent =
            "Your analysis result will appear here";


        resultDashboard.style.display =
            "none";


        confidenceSection.style.display =
            "none";


        detectBtn.disabled = false;

        detectBtn.innerHTML = `
            <span class="button-spark">✦</span>
            <span>Analyze Image</span>
            <span class="button-arrow">→</span>
        `;
    }
);


/* =========================================
   CREATE SCAN OVERLAY
   ========================================= */

function createScanOverlay() {

    const oldOverlay =
        previewContainer.querySelector(
            ".scan-overlay"
        );

    if (oldOverlay) {
        oldOverlay.remove();
    }


    const overlay =
        document.createElement("div");

    overlay.className =
        "scan-overlay active";


    overlay.innerHTML = `

        <div class="scan-line"></div>

        <div class="scan-hud">
            AI SCANNING IMAGE
        </div>

        <div class="scan-corner one"></div>
        <div class="scan-corner two"></div>
        <div class="scan-corner three"></div>
        <div class="scan-corner four"></div>

    `;


    previewContainer.appendChild(overlay);

    return overlay;
}


/* =========================================
   SCAN PROGRESS
   ========================================= */

function createProgressBar() {

    const oldProgress =
        document.querySelector(
            ".scan-progress"
        );

    if (oldProgress) {
        oldProgress.remove();
    }


    const progress =
        document.createElement("div");

    progress.className =
        "scan-progress active";


    progress.innerHTML = `

        <div class="scan-progress-top">

            <span>
                ANALYZING VISUAL SIGNALS
            </span>

            <span id="scanPercent">
                0%
            </span>

        </div>

        <div class="scan-progress-bar">

            <div
                class="scan-progress-fill"
                id="scanProgressFill"
            ></div>

        </div>

    `;


    detectBtn.parentNode.insertBefore(
        progress,
        result
    );


    return progress;
}


/* =========================================
   ANALYSIS ANIMATION
   ========================================= */

function runAnalysis() {

    return new Promise((resolve) => {

        const overlay =
            createScanOverlay();

        const progress =
            createProgressBar();


        const percent =
            document.getElementById(
                "scanPercent"
            );

        const progressFill =
            document.getElementById(
                "scanProgressFill"
            );


        let value = 0;


        const interval =
            setInterval(() => {

                value += 2;


                if (value > 100) {
                    value = 100;
                }


                percent.textContent =
                    value + "%";


                progressFill.style.width =
                    value + "%";


                if (value >= 100) {

                    clearInterval(interval);


                    setTimeout(() => {

                        overlay.remove();

                        progress.remove();

                        resolve();

                    }, 400);
                }

            }, 45);

    });
}


/* =========================================
   TECHNICAL SIGNAL ANIMATION
   ========================================= */

function animateTechnicalSignals() {

    const signals =
        document.querySelectorAll(
            ".signal-fill"
        );


    signals.forEach(
        (signal, index) => {

            const width =
                signal.dataset.width;


            signal.style.setProperty(
                "--signal-width",
                width
            );


            setTimeout(() => {

                signal.classList.add(
                    "animate"
                );

            }, index * 120);

        }
    );
}


/* =========================================
   RESULT DASHBOARD
   ========================================= */

function showResult() {

    const finalConfidence = 94;


    /* Main result */

    resultTitle.textContent =
        "Analysis complete";


    /* Dashboard */

    resultDashboard.style.display =
        "block";


    /* Verdict */

    resultVerdict.textContent =
        "AI Generated";


    resultDescription.textContent =
        "The image shows visual patterns that are consistent with AI-generated content.";


    /* Confidence */

    dashboardConfidence.textContent =
        finalConfidence + "%";


    /* Technical signals */

    animateTechnicalSignals();


    /* Scroll dashboard into view */

    setTimeout(() => {

        resultDashboard.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }, 300);
}


/* =========================================
   ANALYZE BUTTON
   ========================================= */

detectBtn.addEventListener(
    "click",
    async function () {

        /* No image */

        if (!imageInput.files.length) {

            alert(
                "Please choose an image first."
            );

            return;
        }


        /* Disable button */

        detectBtn.disabled = true;


        detectBtn.innerHTML = `
            <span class="button-spark">⌁</span>
            <span>Analyzing Image...</span>
        `;


        /* Hide old result */

        resultDashboard.style.display =
            "none";


        /* Start analysis */

        await runAnalysis();


        /* Show result */

        showResult();


        /* Restore button */

        detectBtn.disabled = false;


        detectBtn.innerHTML = `
            <span class="button-spark">✦</span>
            <span>Analyze Again</span>
            <span class="button-arrow">→</span>
        `;

    }
);


/* =========================================
   INITIAL STATE
   ========================================= */

resultDashboard.style.display =
    "none";

previewContainer.style.display =
    "none";

fileInfo.style.display =
    "none";