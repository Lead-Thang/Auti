# OpenAPI Integration with OpenSpec.dev

This document explains how to integrate OpenAPI specifications with your Next.js project using OpenSpec.dev and how Qwen Code can leverage this for better development assistance.

## What is OpenSpec.dev?

OpenSpec.dev is a platform that automatically generates OpenAPI specifications for your APIs without requiring you to write configuration files or add special comments to your code. For Next.js applications, OpenSpec automatically detects and documents your API routes.

## Benefits of OpenAPI with Qwen Code

Using OpenAPI specifications with Qwen Code provides several advantages:

1. **Better API Understanding**: Qwen Code can analyze your OpenAPI spec to understand your API's structure, endpoints, parameters, request/response formats, and authentication methods.

2. **Code Generation**: Qwen Code can generate client SDKs, server stubs, and documentation based on your OpenAPI specification.

3. **Documentation**: Provides structured, machine-readable documentation that can be automatically generated and maintained.

4. **Testing**: Qwen Code can generate test cases based on your OpenAPI specification to ensure API compliance.

5. **Integration**: Makes it easier for Qwen Code to assist in implementing new API endpoints that follow your existing patterns.

6. **Validation**: Ensures API consistency across your codebase.

## Current OpenAPI Specification

We've generated an initial OpenAPI specification for your project based on the API routes we examined. You can find it at:
- `openapi.yaml` - Contains the OpenAPI specification for your API routes

## How to Use OpenSpec.dev with Your Project

### Option 1: Using OpenSpec Runtime (Recommended for Next.js)

OpenSpec provides a runtime adapter for Next.js that automatically generates the OpenAPI spec from your existing routes:

1. Install the OpenSpec Next.js adapter:
   ```bash
   npm install @openspec/next
   # or
   pnpm add @openspec/next
   ```

2. Create an API route to serve the OpenAPI spec (e.g., `app/api/openapi/route.ts`):
   ```typescript
   import { NextRequest } from 'next/server';
   import { getOpenApiDocument } from '@openspec/next';
   import { config } from '../../../openapi-config'; // Create this config file

   export async function GET(request: NextRequest) {
     const spec = getOpenApiDocument(config);
     return Response.json(spec);
   }
   ```

3. Create the OpenAPI config file (`openapi-config.ts`):
   ```typescript
   import { defineConfig } from '@openspec/next';

   export const config = defineConfig({
     info: {
       title: 'Autilance API',
       version: '1.0.0',
       description: 'API for Autilance e-commerce platform with AI-powered features'
     },
     serverRoot: 'http://localhost:3000',
     include: ['app/api/**/route.ts', 'app/api/**/route.js']
   });
   ```

### Option 2: Manual OpenAPI Specification

We've already created a manual OpenAPI specification in `openapi.yaml` based on your existing API routes. This approach gives you more control over the specification but requires manual maintenance.

## Integrating OpenAPI with Qwen Code

### 1. API Development Assistance

When working with Qwen Code on API development, you can:

- Reference the OpenAPI spec to ensure your implementations match the documented interface
- Ask Qwen Code to generate API client code based on the specification
- Verify that changes to API routes are consistent with the OpenAPI spec

### 2. Testing

Qwen Code can generate test cases based on your OpenAPI specification:

```typescript
// Example: Qwen Code can generate tests like this based on your spec
describe('/api/dropshipping endpoint', () => {
  it('should return suppliers and products', async () => {
    const response = await fetch('/api/dropshipping');
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('suppliers');
    expect(data).toHaveProperty('products');
  });
});
```

### 3. Documentation Generation

With the OpenAPI spec, Qwen Code can help generate:

- API documentation in various formats
- Client libraries for different programming languages
- Interactive API documentation using tools like Swagger UI

## Using the Generated OpenAPI Spec with Qwen Code

To get the most out of Qwen Code with your API specification:

1. Keep the `openapi.yaml` file up to date as you modify your API routes
2. When adding new API routes, consider updating the OpenAPI spec accordingly
3. Use the spec as a reference when implementing new features
4. Consult the spec when reviewing API changes

## Example Usage with Qwen Code

```javascript
// When Qwen Code sees this OpenAPI spec, it can help you with:
// 1. Generating API client functions
// 2. Suggesting correct request/response formats
// 3. Identifying inconsistencies between implementation and spec

// Example API call that matches the OpenAPI spec
async function getDropshippingData() {
  const response = await fetch('/api/dropshipping?action=suppliers');
  const data = await response.json();
  return data;
}
```

## Tools for Working with OpenAPI

- **Swagger Editor**: Edit and validate your OpenAPI documents online
- **Swagger UI**: Generate interactive API documentation
- **OpenAPI Generator**: Generate client SDKs and server stubs
- **Insomnia**: API client that can import OpenAPI specs

## Best Practices

1. **Keep the spec up to date**: Update your OpenAPI specification when you make changes to your API
2. **Use consistent naming**: Follow consistent naming conventions for parameters and responses
3. **Document error responses**: Include common error responses in your specification
4. **Validate your spec**: Use tools to ensure your OpenAPI spec is valid

## Next Steps

1. Install the OpenSpec Next.js adapter for automatic spec generation
2. Set up a documentation page using Swagger UI
3. Add the OpenAPI spec to your API testing workflow
4. Configure Qwen Code to reference your OpenAPI spec during development