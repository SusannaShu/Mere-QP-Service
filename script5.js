document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    const canvas = document.getElementById("networkDiagram");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const tooltip = document.getElementById("tooltip");

    const nodes = [];
    const links = [];

    fetch("industries.json")
        .then((response) => response.json())
        .then((data) => {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 150;

            data.forEach((item, index) => {
                const angle = (index / data.length) * 2 * Math.PI;
                nodes.push({
                    x: centerX + radius * Math.cos(angle),
                    y: centerY + radius * Math.sin(angle),
                    label: item.name,
                    stats: item.stats,
                });

                links.push({
                    from: index,
                    to: (index + 1) % data.length,
                });
            });

            drawDiagram();
        });

    function drawDiagram() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        links.forEach((link) => {
            const fromNode = nodes[link.from];
            const toNode = nodes[link.to];

            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        // Draw nodes
        nodes.forEach((node) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
            ctx.fillStyle = "silver";
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "12px 'Times New Roman'";
            ctx.fillText(node.label, node.x, node.y + 4);
        });
    }

    // Survey Form Handling
    document.getElementById("surveyForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const workHours = parseInt(
            document.getElementById("workHours").value
        );
        const personalHours = parseInt(
            document.getElementById("personalHours").value
        );
        const communityEngagement = document.getElementById(
            "communityEngagement"
        ).value;

        const totalHours = workHours + personalHours;

        const resultHTML = `
            <p><strong>Total Hours Tracked:</strong> ${totalHours} hours</p>
            <p><strong>Community Engagement Level:</strong> ${communityEngagement}/5</p>
            <p><strong>Work-Life Balance Score:</strong> ${(personalHours / totalHours * 100).toFixed(2)}%</p>
        `;

        const resultsDiv = document.getElementById("surveyResults");
        resultsDiv.innerHTML = resultHTML;
        resultsDiv.classList.remove("hidden");
    });
});
