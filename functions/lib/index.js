"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askBlogBot = void 0;
const genai_1 = require("@google/genai");
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const params_1 = require("firebase-functions/params");
const https_1 = require("firebase-functions/v2/https");
(0, app_1.initializeApp)();
const geminiApiKey = (0, params_1.defineSecret)('GEMINI_API_KEY');
const db = (0, firestore_1.getFirestore)();
exports.askBlogBot = (0, https_1.onCall)({ region: 'us-central1', secrets: [geminiApiKey] }, async (request) => {
    const question = typeof request.data?.question === 'string' ? request.data.question.trim() : '';
    if (!question || question.length > 500) {
        throw new https_1.HttpsError('invalid-argument', 'Please provide a question up to 500 characters.');
    }
    const snapshot = await db.collection('blogs').orderBy('createdAt', 'desc').limit(20).get();
    const sources = snapshot.docs.map((document) => document.data().title).filter((title) => typeof title === 'string');
    const context = snapshot.docs.map((document) => {
        const blog = document.data();
        return `TITLE: ${blog.title || 'Untitled'}\nCATEGORY: ${blog.category || 'General'}\nCONTENT: ${blog.content || blog.excerpt || ''}`;
    }).join('\n\n--- BLOG ---\n\n');
    const ai = new genai_1.GoogleGenAI({ apiKey: geminiApiKey.value() });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are the BlogX chatbot. Answer the user's question using ONLY the blog context below. Do not use outside knowledge or invent facts. If the context does not contain the answer, reply exactly: "I couldn't find that in the BlogX stories." Keep the answer concise and mention relevant blog titles when useful.\n\nBLOG CONTEXT:\n${context}\n\nUSER QUESTION:\n${question}`,
    });
    const answer = response.text?.trim();
    if (!answer)
        throw new https_1.HttpsError('internal', 'The chatbot returned an empty answer.');
    return { answer, sources };
});
