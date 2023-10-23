import { Injectable, applyDecorators } from "@nestjs/common";

jest.mock('./common/decorators/queue.decorator', () => {
    return {
        QueueProcessor: () => applyDecorators(Injectable()),
        QueueProcess: () => () => jest.fn(),
    }
});
