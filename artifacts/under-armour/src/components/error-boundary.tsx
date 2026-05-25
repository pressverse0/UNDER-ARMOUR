import { Component, type ReactNode } from "react"
import { AlertTriangle, RefreshCcw, Home } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 px-4">
          <div className="bg-white border-4 border-black rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
            <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-black uppercase text-black mb-2">Something went wrong</h2>
            <p className="text-gray-600 font-bold text-sm mb-2">
              An unexpected error occurred on this page.
            </p>
            {this.state.error && (
              <p className="text-xs font-mono text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-6 text-left break-words">
                {this.state.error.message}
              </p>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black uppercase text-sm px-6 py-3 rounded-xl transition-colors"
              >
                <RefreshCcw className="h-4 w-4" /> Try Again
              </button>
              <a
                href="/"
                className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-black uppercase text-sm px-6 py-3 rounded-xl transition-colors"
              >
                <Home className="h-4 w-4" /> Go Home
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
