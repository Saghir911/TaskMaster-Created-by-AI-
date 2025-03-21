document.addEventListener("DOMContentLoaded", () => {
  // Initial animations when page loads
  animateAppEntry();

  // Add event listeners for dynamic animations
  document
    .getElementById("addTask")
    .addEventListener("click", animateAddButton);
  document.querySelectorAll(".filter, .priority-filter").forEach((filter) => {
    filter.addEventListener("click", () => animateFilterClick(filter));
  });

  // Setup weather form animation if it exists
  // Weather related code removed

  // Observer for task elements to animate them when added
  setupTaskObserver();

  // Setup hover effects
  setupHoverEffects();

  // Setup edit animation handler
  setupEditAnimations();
});

function animateAppEntry() {
  // Create a timeline for the intro animation
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Main app container entrance animation
  tl.from(".todo-app", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    clearProps: "all",
  });

  // Digital clock animation
  tl.from(
    ".digital-clock",
    {
      opacity: 0,
      y: -10,
      duration: 0.5,
      clearProps: "all",
    },
    "-=0.4"
  );

  // Theme toggle animation
  tl.from(
    ".theme-switch-wrapper",
    {
      opacity: 0,
      x: 10,
      duration: 0.5,
      clearProps: "all",
    },
    "-=0.3"
  );

  // Weather widget animation removed

  // Title animation
  tl.from(
    "h1",
    {
      opacity: 0,
      y: -10,
      duration: 0.5,
      clearProps: "all",
    },
    "-=0.4"
  );

  // Animate highlight separately with a bounce effect
  tl.from(
    ".highlight",
    {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      ease: "back.out(1.4)",
      clearProps: "all",
    },
    "-=0.3"
  );

  // Staggered animations for interface elements
  tl.from(
    [
      ".input-container",
      ".search-container",
      ".filter-container",
      ".task-stats",
    ],
    {
      opacity: 0,
      y: 10,
      stagger: 0.08,
      duration: 0.5,
      clearProps: "all",
    },
    "-=0.3"
  );

  // Special animation for filters
  tl.from(
    [".filter", ".priority-filter"],
    {
      opacity: 0,
      x: -3,
      stagger: 0.04,
      duration: 0.3,
      clearProps: "all",
    },
    "-=0.3"
  );
}

function animateAddButton() {
  // Create a timeline for the button animation
  const tl = gsap.timeline({
    defaults: { duration: 0.2, ease: "power2.out" },
  });

  tl.to("#addTask", {
    scale: 0.95,
    backgroundColor: "var(--primary-light)",
    duration: 0.1,
  }).to("#addTask", {
    scale: 1,
    duration: 0.2,
    ease: "back.out(2)",
    clearProps: "scale",
  });

  // Add ripple effect
  const button = document.getElementById("addTask");
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.position = "absolute";
  circle.style.top = "50%";
  circle.style.left = "50%";
  circle.style.transform = "translate(-50%, -50%)";
  circle.style.borderRadius = "50%";
  circle.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  circle.style.pointerEvents = "none";

  // Set button position to relative if not already
  if (window.getComputedStyle(button).position === "static") {
    button.style.position = "relative";
  }

  button.style.overflow = "hidden";
  button.appendChild(circle);

  gsap.fromTo(
    circle,
    { scale: 0, opacity: 1 },
    {
      scale: 1.5,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        circle.remove();
      },
    }
  );
}

function animateFilterClick(filter) {
  // Animate the clicked filter
  gsap.fromTo(
    filter,
    { scale: 0.95 },
    {
      scale: 1,
      duration: 0.3,
      ease: "back.out(2)",
      clearProps: "all",
    }
  );

  // Add a ripple effect to the filter
  const rect = filter.getBoundingClientRect();
  const circle = document.createElement("span");
  const diameter = Math.max(rect.width, rect.height) * 1.5;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.position = "absolute";
  circle.style.top = "50%";
  circle.style.left = "50%";
  circle.style.transform = "translate(-50%, -50%)";
  circle.style.borderRadius = "50%";
  circle.style.backgroundColor = "rgba(139, 92, 246, 0.2)";
  circle.style.pointerEvents = "none";
  circle.style.zIndex = "0";

  if (window.getComputedStyle(filter).position === "static") {
    filter.style.position = "relative";
  }

  filter.style.overflow = "hidden";
  filter.appendChild(circle);

  gsap.fromTo(
    circle,
    { scale: 0, opacity: 1 },
    {
      scale: 1,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        circle.remove();
      },
    }
  );
}

// Weather related functions removed

function setupTaskObserver() {
  // Set up mutation observer to watch for new tasks
  const taskList = document.getElementById("taskList");

  if (!taskList) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        // For each added node, check if it's a task item
        mutation.addedNodes.forEach((node) => {
          if (node.classList && node.classList.contains("task-item")) {
            animateNewTask(node);
          }
        });
      }
    });
  });

  // Start observing the target node with the configured parameters
  observer.observe(taskList, { childList: true });
}

function animateNewTask(taskItem) {
  // Create a more subtle staggered animation for the task item
  gsap.from(taskItem, {
    opacity: 0,
    y: 15,
    duration: 0.4,
    ease: "power2.out",
  });

  // Get all elements inside the task item
  const elements = [
    taskItem.querySelector(".task-checkbox"),
    taskItem.querySelector(".task-text"),
    taskItem.querySelector(".task-priority-badge"),
    ...taskItem.querySelectorAll(".task-actions button"),
  ].filter(Boolean); // Remove any null items

  // Staggered animation for child elements
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 5,
      scale: 0.98,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.03,
      duration: 0.3,
      delay: 0.1,
      ease: "power2.out",
      clearProps: "all",
    }
  );
}

// Add animation to task completion
document.addEventListener("click", function (e) {
  if (
    e.target &&
    e.target.classList &&
    e.target.classList.contains("task-checkbox")
  ) {
    const taskItem = e.target.closest(".task-item");

    if (!taskItem) return;

    const taskText = taskItem.querySelector(".task-text");
    const priorityBadge = taskItem.querySelector(".task-priority-badge");

    if (!taskText) return;

    if (e.target.checked) {
      // Task is being completed - create a timeline
      const tl = gsap.timeline();

      // First animate the checkbox
      tl.fromTo(
        e.target,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 0.3,
          ease: "back.out(2)",
        }
      );

      // Then animate the text strike-through
      tl.to(
        taskText,
        {
          opacity: 0.6,
          color: "var(--gray-color)",
          textDecoration: "line-through",
          textDecorationColor: "var(--gray-color)",
          textDecorationThickness: "2px",
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Animate priority badge if it exists
      if (priorityBadge) {
        tl.to(
          priorityBadge,
          {
            opacity: 0.6,
            color: "var(--gray-color)",
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // Add a subtle background color change
      tl.to(
        taskItem,
        {
          backgroundColor: "rgba(249, 250, 251, 0.7)",
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      );
    } else {
      // Task is being uncompleted
      const tl = gsap.timeline();

      // Animate checkbox
      tl.fromTo(
        e.target,
        { scale: 0.9 },
        {
          scale: 1,
          duration: 0.3,
          ease: "back.out(2)",
        }
      );

      // Animate text return to normal
      tl.to(
        taskText,
        {
          opacity: 1,
          color: "var(--dark-color)",
          textDecoration: "none",
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Animate priority badge return to normal if it exists
      if (priorityBadge) {
        tl.to(
          priorityBadge,
          {
            opacity: 1,
            color: "", // Reset to default color based on priority
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // Return background to normal
      tl.to(
        taskItem,
        {
          backgroundColor: "#f9fafb",
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }
  }
});

function setupHoverEffects() {
  // Add hover effects for various elements

  // Task item hover effect
  const taskItems = document.getElementById("taskList");
  if (taskItems) {
    // Use event delegation for better performance
    taskItems.addEventListener("mouseover", (e) => {
      const taskItem = e.target.closest(".task-item");
      if (!taskItem) return;

      gsap.to(taskItem, {
        y: -2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
        duration: 0.2,
        ease: "power2.out",
      });
    });

    taskItems.addEventListener("mouseout", (e) => {
      const taskItem = e.target.closest(".task-item");
      if (!taskItem) return;

      gsap.to(taskItem, {
        y: 0,
        boxShadow: "none",
        duration: 0.2,
        ease: "power2.out",
      });
    });
  }

  // Add hover effects for buttons
  const buttons = document.querySelectorAll(
    ".bulk-actions-btn, #clearCompleted"
  );
  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      gsap.to(button, {
        y: -1,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseout", () => {
      gsap.to(button, {
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    });
  });

  // Weather toggle hover effects removed

  // Hover effects for custom select
  const customSelect = document.querySelector(".custom-select");
  if (customSelect) {
    const prioritySelect = customSelect.querySelector(".priority-select");
    const selectIcon = customSelect.querySelector(".select-icon");

    prioritySelect.addEventListener("mouseover", () => {
      gsap.to(selectIcon, {
        y: 2,
        opacity: 0.8,
        duration: 0.2,
      });
    });

    prioritySelect.addEventListener("mouseout", () => {
      gsap.to(selectIcon, {
        y: 0,
        opacity: 1,
        duration: 0.2,
      });
    });

    prioritySelect.addEventListener("focus", () => {
      gsap.to(selectIcon, {
        rotate: 180,
        duration: 0.3,
      });
    });

    prioritySelect.addEventListener("blur", () => {
      gsap.to(selectIcon, {
        rotate: 0,
        duration: 0.3,
      });
    });
  }

  // Weather form hover effects removed
}

// Add a subtle parallax effect to todo app when mouse moves
// For Desktop only, as this can cause issues on mobile
if (window.innerWidth > 768) {
  document.addEventListener(
    "mousemove",
    throttle((e) => {
      const todoApp = document.querySelector(".todo-app");
      if (!todoApp) return;

      // Make the effect much more subtle
      const xAxis = (window.innerWidth / 2 - e.pageX) / 150;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 150;

      // Limit the maximum rotation to keep it subtle
      const clampedX = Math.min(Math.max(xAxis, -1), 1);
      const clampedY = Math.min(Math.max(yAxis, -1), 1);

      gsap.to(todoApp, {
        rotationY: clampedX,
        rotationX: clampedY,
        transformPerspective: 1000,
        duration: 0.8,
        ease: "power1.out",
      });
    }, 100)
  ); // Throttle to improve performance
}

// Utility function to throttle events for better performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Update task count animation
function animateTaskCount(element, newValue) {
  if (!element) return;

  gsap.to(element, {
    opacity: 0,
    y: -5,
    duration: 0.2,
    ease: "power2.in",
    onComplete: () => {
      element.textContent = newValue;
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    },
  });
}

// Function to setup edit animations
function setupEditAnimations() {
  document.addEventListener("click", function (e) {
    // When edit button is clicked
    if (e.target.closest(".task-edit")) {
      const taskItem = e.target.closest(".task-item");
      if (taskItem) {
        // Animate the transition to edit mode
        gsap.to(taskItem, {
          backgroundColor: "rgba(139, 92, 246, 0.05)",
          borderColor: "rgba(139, 92, 246, 0.3)",
          duration: 0.3,
        });
      }
    }

    // When save or cancel buttons are clicked
    if (e.target.closest(".edit-save") || e.target.closest(".edit-cancel")) {
      const taskItem = e.target.closest(".task-item");
      if (taskItem) {
        // Animate back to normal state
        gsap.to(taskItem, {
          backgroundColor: "",
          borderColor: "",
          duration: 0.3,
        });
      }
    }
  });
}
