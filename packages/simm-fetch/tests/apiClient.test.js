var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { get, post, put, del } from '../src/apiClient';
describe('API Client', () => {
    test('GET request', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield get('/endpoint');
        expect(response.status).toBe(200);
    }));
    test('POST request', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield post('/endpoint', { key: 'value' });
        expect(response.status).toBe(200);
    }));
    test('PUT request', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield put('/endpoint', { key: 'value' });
        expect(response.status).toBe(200);
    }));
    test('DELETE request', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield del('/endpoint');
        expect(response.status).toBe(200);
    }));
    test('GET request with retry', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield get('/endpoint', { retry: 3 });
        expect(response.status).toBe(200);
    }));
    test('GET request with timeout', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(get('/endpoint', { timeout: 1000 })).rejects.toThrow('Request timed out');
    }));
});
