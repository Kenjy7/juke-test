<template>
  <div>
    <!-- Toggle Button -->
    <button
        id="chatToggle"
        @click="toggleChat"
        @mouseenter="toggleHover = true"
        @mouseleave="toggleHover = false"
        :style="toggleButtonStyle"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
      </svg>
    </button>

    <!-- Chat Window -->
    <div v-if="open" id="chatbox" :style="chatboxStyle">
      <!-- Header -->
      <div id="chatHeader">
        <div class="header-content">
          <div class="header-logo">
            <img src="../../src/assets/img/logo.png" alt="JUKE Logo" width="32" height="32" />
            <div class="status-indicator"></div>
          </div>
          <div>
            <div class="header-title">JUKE Coding Assistent</div>
            <div class="header-subtitle">Online - We helpen je graag</div>
          </div>
        </div>
        <button
            id="closeBtn"
            @click="closeChat"
            @mouseenter="closeHover = true"
            @mouseleave="closeHover = false"
            :style="closeBtnStyle"
        >
          ✕
        </button>
      </div>

      <!-- Messages -->
      <div id="chatlog" ref="chatlog">
        <div v-if="messages.length === 0" class="welcome-message">
          <div class="welcome-icon">
            <div class="welcome-logo-container">
              <img src="../../src/assets/img/logo.png" alt="JUKE Logo" class="welcome-logo" />
            </div>
          </div>
          <div class="welcome-title">Welkom bij JUKE Coding!</div>
          <div class="welcome-text">
            Stel gerust je vragen over onze diensten
          </div>
          <div class="quick-questions">
            <button
                v-for="(q, idx) in quickQuestions"
                :key="idx"
                @click="sendQuickQuestion(q)"
                class="quick-question-btn"
            >
              {{ q.icon }} {{ q.text }}
            </button>
          </div>
        </div>

        <div
            v-for="(msg, i) in messages"
            :key="i"
            class="msg-container"
            :class="msg.sender"
        >
          <!-- Bot Avatar -->
          <div v-if="msg.sender === 'bot'" class="bot-avatar">
            <img src="../../src/assets/img/logo.png" alt="JUKE Logo" class="bot-avatar-img" />
          </div>

          <div class="msg-wrapper">
            <div class="msg" :class="msg.sender">
              {{ msg.text }}
            </div>
            <div class="msg-time">{{ msg.time }}</div>
          </div>
        </div>

        <div v-if="isTyping" class="msg-container bot">
          <div class="bot-avatar">
            <img src="../../src/assets/logo.webp" alt="JUKE Logo" class="bot-avatar-img" />
          </div>
          <div class="msg-wrapper">
            <div class="msg bot typing-indicator">
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div id="inputArea">
        <input
            v-model="input"
            @keyup.enter="sendMessage"
            @focus="inputFocus = true"
            @blur="inputFocus = false"
            placeholder="Typ je bericht..."
            :style="inputStyle"
        />
        <button
            @click="sendMessage"
            :disabled="!input.trim()"
            @mouseenter="sendHover = true"
            @mouseleave="sendHover = false"
            :style="sendButtonStyle"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>

      <!-- Resize Handle -->
      <div
          id="resizeHandle"
          @mousedown="startResize"
          @mouseenter="resizeHover = true"
          @mouseleave="resizeHover = false"
          :style="resizeHandleStyle"
      ></div>
    </div>
  </div>
</template>

<script>
const STORAGE_KEY = "juke_chat_state_v1";

function newSessionId() {
  return (
      "sess_" +
      Math.random().toString(16).slice(2) +
      "_" +
      Date.now().toString(16)
  );
}

function getCurrentTime() {
  const now = new Date();
  return now.getHours().toString().padStart(2, '0') + ':' +
      now.getMinutes().toString().padStart(2, '0');
}

export default {
  data() {
    return {
      open: false,
      input: "",
      messages: [],
      width: 400,
      height: 600,
      resizing: false,
      isTyping: false,
      toggleHover: false,
      closeHover: false,
      sendHover: false,
      resizeHover: false,
      inputFocus: false,
      sessionId: null,
      quickQuestions: [
        { icon: "Info", text: "Wat zijn jullie diensten?" },
        { icon: "Contact", text: "Hoe kan ik contact opnemen?" }
      ]
    };
  },

  mounted() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        this.messages = saved.messages || [];
        this.sessionId = saved.sessionId || newSessionId();
      } else {
        this.sessionId = newSessionId();
      }
    } catch (e) {
      this.sessionId = newSessionId();
    }
  },

  watch: {
    messages: {
      deep: true,
      handler() {
        this.persistChat();
      },
    },
    sessionId() {
      this.persistChat();
    },
  },

  computed: {
    toggleButtonStyle() {
      return {
        transform: this.toggleHover ? "scale(1.1)" : "scale(1)",
        boxShadow: this.toggleHover
            ? "var(--shadow-glow-primary)"
            : "var(--shadow-glow-primary)",
      };
    },
    chatboxStyle() {
      return { width: this.width + "px", height: this.height + "px" };
    },
    closeBtnStyle() {
      return {
        background: this.closeHover
            ? "var(--color-border-hover)"
            : "var(--color-primary-border)",
      };
    },
    inputStyle() {
      return {
        borderColor: this.inputFocus ? "var(--color-border-active)" : "var(--color-border)",
        background: this.inputFocus ? "var(--color-bg-surface)" : "var(--color-bg-card-inner)",
      };
    },
    sendButtonStyle() {
      const hasInput = this.input.trim();
      return {
        background: hasInput
            ? "var(--color-primary)"
            : "var(--color-bg-surface)",
        cursor: hasInput ? "pointer" : "not-allowed",
        opacity: hasInput ? 1 : 0.5,
      };
    },
    resizeHandleStyle() {
      return { opacity: this.resizeHover ? "1" : "0.6" };
    },
  },

  methods: {
    persistChat() {
      localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            sessionId: this.sessionId,
            messages: this.messages,
          })
      );
    },

    toggleChat() {
      this.open = !this.open;
    },

    closeChat() {
      this.open = false;
      this.input = "";
      this.messages = [];
      this.sessionId = newSessionId();
      localStorage.removeItem(STORAGE_KEY);
    },

    sendQuickQuestion(question) {
      this.input = question.text;
      this.sendMessage();
    },

    async sendMessage() {
      if (!this.input.trim()) return;

      const userText = this.input;
      this.messages.push({
        sender: "user",
        text: userText,
        time: getCurrentTime()
      });
      this.input = "";
      this.isTyping = true;

      try {
        const response = await fetch("/.netlify/functions/chatbot-proxy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: userText,
            sessionId: this.sessionId,
            history: this.messages.slice(-10),
          }),
        });

        const data = await response.json().catch(() => ({}));
        let reply = "Geen antwoord ontvangen.";

        if (response.ok && typeof data.reply === "string" && data.reply.trim()) {
          reply = data.reply.trim();
        } else if (typeof data.error === "string" && data.error.trim()) {
          reply = data.error.trim();
        } else if (!response.ok) {
          reply = `Server error (${response.status}).`;
        }

        this.isTyping = false;
        this.messages.push({
          sender: "bot",
          text: reply,
          time: getCurrentTime()
        });

        fetch("/.netlify/functions/discord-log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: this.sessionId,
            message: userText,
            reply: reply,
          }),
        });

      } catch (err) {
        this.isTyping = false;
        this.messages.push({
          sender: "bot",
          text: "Er ging iets mis met de server.",
          time: getCurrentTime()
        });
      }

      this.$nextTick(() => {
        const chatlog = this.$refs.chatlog;
        if (chatlog) chatlog.scrollTop = chatlog.scrollHeight;
      });
    },

    startResize(e) {
      this.resizing = true;
      document.addEventListener("mousemove", this.resize);
      document.addEventListener("mouseup", this.stopResize);
      e.preventDefault();
    },
    resize(e) {
      if (!this.resizing) return;
      this.width = Math.max(
          320,
          Math.min(600, window.innerWidth - e.clientX - 40)
      );
      this.height = Math.max(
          400,
          Math.min(700, window.innerHeight - e.clientY - 110)
      );
    },
    stopResize() {
      this.resizing = false;
      document.removeEventListener("mousemove", this.resize);
      document.removeEventListener("mouseup", this.stopResize);
    },
  },
};
</script>

<style scoped>
/* Toggle Button */
#chatToggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: var(--color-primary);
  color: var(--color-text-primary);
  border: none;
  border-radius: var(--radius-full);
  width: 64px;
  height: 64px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-shadow: var(--shadow-glow-primary);
  transition: transform var(--duration-base) var(--ease-spring),
              box-shadow var(--duration-base) var(--ease-spring);
}

/* Chat Window */
#chatbox {
  position: fixed;
  bottom: 100px;
  right: 24px;
  background: var(--color-bg-primary);
  backdrop-filter: blur(var(--blur-lg));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-elevated);
  overflow: hidden;
  z-index: 1000;
  animation: slideUp var(--duration-base) var(--ease-out-expo);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header */
#chatHeader {
  background: var(--color-bg-card-inner);
  color: var(--color-text-primary);
  padding: var(--space-6) var(--space-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.header-logo {
  position: relative;
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background: var(--color-success);
  border: 2px solid var(--color-bg-card-inner);
  border-radius: var(--radius-full);
  animation: pulse-dot 2s var(--ease-smooth) infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.header-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.header-subtitle {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--color-text-secondary);
  font-weight: 400;
}

#closeBtn {
  background: var(--color-bg-surface);
  border: none;
  color: var(--color-text-primary);
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--duration-fast) var(--ease-out-expo);
}

/* Messages */
#chatlog {
  flex: 1;
  padding: var(--space-6);
  overflow-y: auto;
  background: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.welcome-message {
  text-align: center;
  color: var(--color-text-secondary);
  margin-top: var(--space-12);
  font-family: var(--font-sans);
  font-size: 14px;
}

.welcome-icon {
  margin-bottom: var(--space-6);
  display: flex;
  justify-content: center;
}

.welcome-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px;
  margin-bottom: var(--space-2);
  color: var(--color-text-primary);
}

.welcome-text {
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-6);
}

.quick-questions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-6);
}

.quick-question-btn {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-sans);
  font-size: 14px;
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-out-expo),
              transform var(--duration-fast) var(--ease-out-expo),
              box-shadow var(--duration-fast) var(--ease-out-expo);
  text-align: left;
  color: var(--color-text-secondary);
}

.quick-question-btn:hover {
  border-color: var(--color-primary-border);
  transform: translateY(-1px);
  box-shadow: var(--shadow-glow-primary);
}

.msg-container {
  display: flex;
  gap: var(--space-3);
  animation: slideUp var(--duration-base) var(--ease-out-expo);
}

.msg-container.user {
  justify-content: flex-end;
}

.msg-container.bot {
  justify-content: flex-start;
}

.bot-avatar {
  flex-shrink: 0;
  margin-top: 4px;
}

.bot-avatar-img {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  object-fit: cover;
  box-shadow: var(--shadow-ambient);
}

.header-logo img {
  border-radius: var(--radius-full);
  object-fit: cover;
}

.welcome-logo-container {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: var(--shadow-glow-primary);
}

.welcome-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.msg-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 75%;
}

.msg {
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.msg.user {
  border-radius: 16px 16px 4px 16px;
  background: var(--color-primary);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-ambient);
  margin-left: auto;
}

.msg.bot {
  border-radius: 16px 16px 16px 4px;
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-ambient);
  border: 1px solid var(--color-border);
}

.msg-time {
  font-family: var(--font-sans);
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin-top: var(--space-1);
  padding: 0 var(--space-2);
}

.msg-container.user .msg-time {
  text-align: right;
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  gap: 6px;
  padding: var(--space-3) var(--space-4);
  width: 60px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  animation: pulse 1.4s var(--ease-smooth) infinite;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}

/* Input Area */
#inputArea {
  display: flex;
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-card-inner);
  gap: var(--space-3);
}

#inputArea input {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  outline: none;
  font-family: var(--font-sans);
  font-size: 14px;
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  transition: border-color var(--duration-fast) var(--ease-out-expo);
}

#inputArea input:focus {
  border-color: var(--color-border-active);
}

#inputArea button {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: var(--radius-lg);
  color: var(--color-text-primary);
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--duration-fast) var(--ease-out-expo),
              box-shadow var(--duration-fast) var(--ease-out-expo);
}

#inputArea button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-glow-primary);
}

/* Resize Handle */
#resizeHandle {
  width: 20px;
  height: 20px;
  background: var(--color-primary);
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: se-resize;
  border-top-left-radius: var(--radius-sm);
  border-bottom-right-radius: var(--radius-2xl);
  transition: opacity var(--duration-fast) var(--ease-out-expo);
}

/* Scrollbar */
#chatlog::-webkit-scrollbar {
  width: 6px;
}

#chatlog::-webkit-scrollbar-track {
  background: transparent;
}

#chatlog::-webkit-scrollbar-thumb {
  background: var(--color-bg-surface);
  border-radius: var(--radius-sm);
}

#chatlog::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-tertiary);
}

/* Responsive */
@media (max-width: 500px) {
  #chatbox {
    right: var(--space-3);
    bottom: 90px;
    max-width: calc(100vw - var(--space-6));
    border-radius: var(--radius-xl);
  }

  #chatToggle {
    right: var(--space-3);
    bottom: var(--space-3);
  }

  .msg-wrapper {
    max-width: 85%;
  }
}
</style>
