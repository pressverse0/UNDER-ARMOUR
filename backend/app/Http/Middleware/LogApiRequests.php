<?php

namespace App\Http\Middleware;

use App\Services\LogService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogApiRequests
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $startTime = microtime(true);

        // Log incoming request
        LogService::logApiRequest(
            $request->getMethod(),
            $request->getPathInfo(),
            $request->user()?->id,
            $request->all()
        );

        $response = $next($request);

        // Log response
        $duration = (microtime(true) - $startTime) * 1000; // Convert to milliseconds
        
        if ($response->getStatusCode() >= 400) {
            LogService::logApiError(
                $request->getMethod(),
                $request->getPathInfo(),
                $response->getStatusCode(),
                $response->getContent(),
                $request->user()?->id
            );
        } else {
            LogService::logApiResponse(
                $request->getMethod(),
                $request->getPathInfo(),
                $response->getStatusCode(),
                $request->user()?->id,
                $duration
            );
        }

        // Log performance if slow
        if ($duration > 1000) { // More than 1 second
            LogService::logPerformance(
                $request->getMethod() . ' ' . $request->getPathInfo(),
                $duration,
                ['slow_request' => true]
            );
        }

        return $response;
    }
}
